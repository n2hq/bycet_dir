// app/routes/sitemap.xml.tsx
import { LoaderFunction } from "@remix-run/node";
import { config } from "~/lib/lib";

export type SiteUrlType = {
    title: string
    url: string
    changeFrequency: string
    priority: Number
}

export const siteUrls = [
    {
        title: "Home",
        url: '/',
        changeFrequency: 'daily',
        priority: 1.0
    },
    {
        title: "Search",
        url: '/web/search',
        changeFrequency: 'daily',
        priority: 0.9
    },
    {
        title: "Contact",
        url: '/web/contact',
        changeFrequency: 'monthly',
        priority: 0.6
    },
    {
        title: "Terms of Service",
        url: '/web/terms',
        changeFrequency: 'yearly',
        priority: 0.4
    },
    {
        title: "Privacy",
        url: '/web/privacy',
        changeFrequency: 'yearly',
        priority: 0.4
    },
    {
        title: "Responsible Disclosure",
        url: '/web/responsible-disclosure',
        changeFrequency: 'yearly',
        priority: 0.4
    },
    {
        title: "Copyright",
        url: '/web/copyright',
        changeFrequency: 'yearly',
        priority: 0.3
    },
    {
        title: "Signup",
        url: '/web/signup',
        changeFrequency: 'monthly',
        priority: 0.7
    },
    {
        title: "Signin",
        url: '/web/signin',
        changeFrequency: 'yearly',
        priority: 0.7
    },
    {
        title: "Reset Password",
        url: '/web/reset-password',
        changeFrequency: 'yearly',
        priority: 0.6
    },
]

export const loader: LoaderFunction = async ({ params }) => {

    const baseUrl = config.BASE_URL


    const homeUrl = `<url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`

    const urls = siteUrls?.map((item: SiteUrlType, index: number) =>
        `<url>
            <loc>${baseUrl}${item.url}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>${item.changeFrequency}</changefreq>
            <priority>${item.priority}</priority>
          </url>`
    )
        .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    
    ${urls}
  </urlset>`;

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
        },
    });
};
