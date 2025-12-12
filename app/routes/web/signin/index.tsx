import React from 'react'
import ResponsiveNav from '~/components/header/minimal/ResponsiveNav'
import SigninBody from './assets/SigninBody'
import { OperationProvider } from '~/context/OperationContext'
import { generateRandom10DigitNumber, logError } from '~/lib/lib'
import { MetaFunction } from '@remix-run/react'
import { LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = async ({ request, params }) => {

    try {
        let randomNumber
        try {
            randomNumber = generateRandom10DigitNumber()
            //console.log(latestBusinesses)

        } catch (error: any) {
            console.log(error.message)
        }

        return {
            randomNumber: randomNumber
        }
    } catch (err: any) {
        logError(err)
    }

}

export const meta: MetaFunction<typeof loader> = ({ data }) => {

    let randomNo = data?.randomNumber
    try {



        return [
            { title: "Bycet Sign in - Online Business Directory, Explore Listings Around The World" },
            { name: "description", content: "Discover and connect with businesses worldwide. Bycet.com helps you explore listings, find services, and grow your network across industries and countries." },
            { name: "keywords", content: "Business Directory Service, Location Services" },
            { property: "fb:app_id", content: "1325393508603168" },
            { property: "og:url", content: "https://bycet.com/web/signup" },
            { property: "og:type", content: "website" },
            { property: "og:title", content: "Bycet Sign in - Online Business Directory, Explore Listings Around The World" },
            { property: "og:description", content: "Discover and connect with businesses worldwide. Bycet.com helps you explore listings, find services, and grow your network across industries and countries." },
            { property: "og:image", content: `https://bycet.com/images/bycet.png?v=${randomNo}` },
            { property: "og:image:secure_url", content: `https://bycet.com/images/bycet.png?v=${randomNo}` },
            { property: "og:image:type", content: "image/png" },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            { property: "og:image:alt", content: "Bycet" },
            { name: "twitter:site", content: "@bycetinc" },
            { name: "twitter:creator", content: "@bycetinc" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: "Bycet Sign in - Online Business Directory, Explore Listings Around The World" },
            { name: "twitter:description", content: "Discover and connect with businesses worldwide. Bycet.com helps you explore listings, find services, and grow your network across industries and countries." },
            { name: "twitter:image", content: `https://bycet.com/images/bycet.png?v=${randomNo}` },
            { name: "twitter:image:alt", content: "Bycet Business Directory Logo" }
        ];
    } catch (e: any) {
        logError(e)
    }

    return []
};

const index = () => {
    return (
        <div>
            {/* <ResponsiveNav theme='light' /> */}
            <OperationProvider>
                <SigninBody />
            </OperationProvider>
        </div>
    )
}

export default index
