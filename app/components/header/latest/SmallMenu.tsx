import { Link, useLocation } from '@remix-run/react'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';

const menudata = [
    {
        title: "Browse",
        url: "/web/browse"
    },
    {
        title: "New York",
        url: "/web/browse?q=new york"
    },

    {
        title: "London",
        url: "/web/browse?q=london"
    },
    {
        title: "Dubai",
        url: "/web/browse?q=dubai"
    },
]
const SmallMenu = () => {
    const location = useLocation();

    return (
        <div className={`hidden lg:block`}>
            <div className={`flex gap-8 place-items-center`}>
                {
                    menudata?.map((item, index: number) => {
                        return (
                            <div key={index} className={`font-semibold ${location.pathname === item.url ? 'text-black' : 'text-gray-500'} `}>
                                <Link to={item.url}>
                                    <div className={`capitalize`}>
                                        {
                                            item.title
                                        }
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }

                <MoreItem />
            </div>
        </div>
    )
}

export default SmallMenu


export const MoreItem = () => {
    return (
        <div className={`h-[35px] w-[35px] rounded-full flex place-items-center place-content-center bg-gray-100 cursor-pointer`}>
            <BsThreeDotsVertical />
        </div>
    )
}