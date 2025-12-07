import { LoaderFunction } from "@remix-run/node"
import { convertDashToSpace, DoResponse } from "~/lib/lib"
import { query } from "../DB"



export const loader: LoaderFunction = async ({ request, params }) => {

    const ITEMS_PER_PAGE = 20;
    const contentType = request.headers.get("Content-Type")

    try {
        const url = new URL(request.url);
        const searchParams = {
            criteria: url.searchParams.get("q") || "",
            page: Math.max(1, Number(url.searchParams.get("page")) || 1)
        };

        const offset = (searchParams.page - 1) * ITEMS_PER_PAGE;

        const category = params.category
        const city_param = params.city || ""
        const city = convertDashToSpace(city_param)

        //console.log(category)
        //console.log(city)

        // 1. FIRST: Get TOTAL COUNT
        const countResult: any = await query(`
            SELECT COUNT(DISTINCT d.id) as total_count
            FROM tbl_dir d
            LEFT JOIN tbl_city ci ON d.city_id = ci.id
            WHERE d.category = ?  
            AND ci.name = ?
            ${searchParams.criteria ? `AND (d.title LIKE ? OR d.short_description LIKE ?)` : ''}
        `, [
            category,
            city,
            ...(searchParams.criteria ? [`%${searchParams.criteria}%`, `%${searchParams.criteria}%`] : [])
        ]);

        const totalCount = countResult[0]?.total_count || 0;
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);


        // 2. SECOND: Get PAGINATED DATA
        const rawdata: any = await query(`
                SELECT
                    d.rating_count,
                    d.rating_average,
                    d.username,
                    d.gid,
                    d.title,
                    d.address_one,
                    d.address_two,
                    c.latitude,
                    c.longitude,
                    d.phone,
                    d.email_address AS email_address,
                    d.website,
                    d.short_description AS short_description,
                    d.category,
                    d.country_code,
                    d.state_code,
                    d.city_id,
                    d.date_created AS created_at,
                    d.last_updated AS updated_at,
                    ci.name AS city_name,
                    s.name AS state_name,
                    c.name AS country_name,
                    (
                        SELECT bpi2.image_url
                        FROM tbl_business_profile_image bpi2
                        WHERE bpi2.business_guid = d.gid
                        ORDER BY bpi2.date_created DESC
                        LIMIT 1
                    ) AS image_url,
                    (
                        SELECT GROUP_CONCAT(
                        CONCAT(sm.media_id, '$', sm.user_description, '$', sysm.base_url)
                        SEPARATOR ', '
                        )
                        FROM tbl_selected_social_media sm
                        JOIN tbl_sys_social_media sysm ON sm.media_id = sysm.media_id
                        WHERE d.gid = sm.business_guid
                    ) AS social_media,
                    -- Use subquery for operating hours instead of JOIN
                    (
                        SELECT open_status FROM tbl_operating_hours
                        WHERE business_guid = d.gid ORDER BY id DESC LIMIT 1
                    ) as open_status,
                    (
                        SELECT no_hours_available FROM tbl_operating_hours
                        WHERE business_guid = d.gid ORDER BY id DESC LIMIT 1
                    ) as no_hours_available
                    -- ... repeat for other oh columns or use JSON/concatenation
                FROM tbl_dir d
                LEFT JOIN tbl_country c ON d.country_code = c.iso2
                LEFT JOIN tbl_state s ON d.state_code = s.iso2 AND d.country_code = s.country_code
                LEFT JOIN tbl_city ci ON d.city_id = ci.id
                WHERE d.category = ?
                AND ci.name = ?
                ${searchParams.criteria ? `AND (d.title LIKE ? OR d.short_description LIKE ?)` : ''}
                AND d.active_status = true
                -- NO GROUP BY NEEDED!
                ORDER BY d.date_created DESC
                LIMIT ? OFFSET ?
            `, [
            category,
            city,
            ...(searchParams.criteria ? [`%${searchParams.criteria}%`, `%${searchParams.criteria}%`] : []),
            ITEMS_PER_PAGE,
            offset
        ]);



        // 3. RETURN PAGINATED RESPONSE
        return DoResponse({
            success: true,
            data: rawdata,
            pagination: {
                current_page: searchParams.page,
                items_per_page: ITEMS_PER_PAGE,
                total_items: totalCount,
                total_pages: totalPages,
                has_next_page: searchParams.page < totalPages,
                has_prev_page: searchParams.page > 1,
                next_page: searchParams.page < totalPages ? searchParams.page + 1 : null,
                prev_page: searchParams.page > 1 ? searchParams.page - 1 : null
            },
            filters: {
                category: category,
                city: city,
                search_criteria: searchParams.criteria || null
            }
        }, 200);

    } catch (error: any) {
        console.error("Search error:", error.message);
        return DoResponse({ error: "Internal server error" }, 500);
    }










}