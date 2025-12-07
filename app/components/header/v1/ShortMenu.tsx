import React, { useEffect, useState } from 'react'
import { ShortMenuJson } from './ShortMenuJson'
import { Link, useLocation } from '@remix-run/react'
import { CgChevronDown, CgChevronRight } from 'react-icons/cg'
import { BsExclamation } from 'react-icons/bs'

const ShortMenu = () => {

    const location = useLocation()

    return (
        <div className={`lg:flex gap-8 hidden px-4`}>
            <div className={`${location.pathname.includes('/web/search') && 'underline'}`}>
                <Link to={'/web/search'}>
                    <div className={`flex place-items-center group hover:underline`}>
                        <div className={`text-[14px] font-extrabold pr-2`}>
                            Search
                        </div>

                    </div>
                </Link>
            </div>



            {
                ShortMenuJson.map((item, index: number) => {
                    return (
                        <div key={index} className={`hover:text-[#6001D2] ${location.pathname === item.url && 'underline'}`}>
                            <Link to={item.url}>
                                <div className={`flex place-items-center group hover:underline`}>
                                    <div className={`text-[14px]`}>
                                        {item.title}
                                    </div>
                                    <CgChevronRight
                                        className={`text-[15px] relative group-hover:rotate-90 transition-all ease-in-out duration-500 font-bold `} />
                                </div>
                            </Link>
                        </div>
                    )
                })
            }

            {/* <div className={` hover:text-[#6001D2]`}>
                <Link to={`#`}>
                    <div className={`flex place-items-center gap-1 text-[14px]`}>
                        <span>
                            More
                        </span>
                        <span className={`top-[1px]`}>
                            <CgChevronDown />
                        </span>
                    </div>
                </Link>
            </div> */}
        </div>
    )
}

export default ShortMenu
