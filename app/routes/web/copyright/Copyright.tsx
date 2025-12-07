import { LoaderFunction } from "@remix-run/node";
import PolicyInfoHeader from "~/components/content/PolicyInfoHeader";
import CopyrightPolicy from "./CopyrightPolicy";
import { MetaFunction } from "@remix-run/react";
import MainNav from "~/components/header/v1/MainNav";
import FooterAlt from "~/components/footer/FooterAlt";

export const meta: MetaFunction<typeof loader> = ({ data }) => {

    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export const loader: LoaderFunction = async ({ params, context }) => {
    return { message: context.VALUE_FROM_EXPRESS };
}


export default function Copyright() {
    const bgImg = `https://unbound.radiantthemes.com/wp-content/uploads/2018/06/business-agency-3-banner.jpg?id=7870`
    const title = `Industry-Specific Solutions, Powered by AI & Data.`
    const description = `We don't just build technology; we build your competitive advantage. Our end-to-end expertise delivers custom software and intelligent systems that solve your unique industry challenges and drive growth.`

    return (
        <div>
            <MainNav />






            <CopyrightPolicy />

            <FooterAlt />

        </div>
    )
}
