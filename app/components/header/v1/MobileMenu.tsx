import React, { ReactNode, useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'



import { CgChevronRight } from 'react-icons/cg'



import { useLocation } from '@remix-run/react'
import { Link } from 'react-router-dom'
import LeftNav from '~/routes/web/account/assets/LeftNav'
import { useAuth } from '~/context/AuthContext'
import { getUserProfile } from '~/lib/lib'
import { IconType } from 'react-icons'
import HeaderLogo from './HeaderLogo'
import { moremenu } from './more_menu'


export interface MobileMenuProps {
    openMenu: boolean
    closeNav: () => void
}

export type MenuType = {
    title: string,
    url: string,
    icon: ReactNode
}

const MobileMenu = ({ openMenu, closeNav }: MobileMenuProps) => {
    const location = useLocation();

    const navOpen = openMenu ? 'translate-x-0' : 'translate-x-[-100%]'
    const bgOverlay = openMenu ? 'block' : 'hidden'

    const [userProfile, setUserProfile] = useState<any | null>(null)

    const auth = useAuth()
    if (!auth) { return null }
    const { user } = auth

    useEffect(() => {
        const getData = async (guid: string) => {
            const userProfile = await getUserProfile(guid || "")
            setUserProfile(userProfile)
        }

        if (auth?.user) {
            getData(auth?.user.guid)
        }

    }, [auth?.user])


    return (
        <div className={``}>
            {/** overlay */}
            <div
                onClick={closeNav}
                className={`transform fixed transition-all duration-500 inset-0 z-4000 bg-black opacity-20 w-full ${bgOverlay}`}>
            </div>


            {/** navlinks body wrapper */}
            <div className={`transform transition-all duration-500 delay-0 fixed justify-start h-full w-full md:w-[320px] bg-white z-[4001] overflow-y-auto top-0 left-0 text-black ${navOpen} ${openMenu ? 'shadow-lg shadow-black/50' : ''} bg-[url(https://unbound.radiantthemes.com/wp-content/uploads/2022/03/Banner-Image.png?id=8229)]`}>

                {/** navlinks body */}
                <div className={`bg-transparent `}>

                    {/** mobile nav header with logo and close */}
                    <div className={` px-4 md:pl-12 flex place-content-between h-[60px] place-items-center`}>

                        {/** logo wrapper */}
                        <div className='h-full flex justify-center items-center'>
                            <HeaderLogo />
                        </div>

                        <div className='h-full flex justify-center items-center cursor-pointer'>

                            <div
                                onClick={closeNav}
                                className='w-[30px] h-[30px] bg-gray-200 rounded-full flex justify-center items-center hover:bg-blue-600 hover:text-white border border-gray-500 group'>
                                <IoClose size={28} className={` transition-all duration-500 ease-in-out group-hover:rotate-90`} />
                            </div>
                        </div>
                    </div>

                    <hr className={`mobile-nav-hrule`} />





                    <VerticalMenu
                        menuData={moremenu}
                        closeNav={closeNav}
                    />

                    <div>
                        <hr className={`mt-[20px]`} />
                        <div className={`mt-[20px]`}></div>

                        {
                            user && <LeftNav userProfile={userProfile} />
                        }
                    </div>
                    <div className={`h-10`} />

                </div>
            </div>
        </div>
    )
}


const VerticalMenu = ({ menuData, closeNav }: any) => {
    const location = useLocation()

    return (
        <div>
            {
                menuData.map((menu: MenuType, index: number) => {
                    const IconComponent = menu.icon

                    return (
                        <div key={index}>
                            <Link to={menu.url} onClick={() => closeNav()}>
                                <div
                                    className={`group text-[15px] py-2 px-4 rounded-none hover:bg-gray-200 hover:cursor-pointer flex place-items-center place-content-between w-full hover:text-gray-500 ${location.pathname === menu.url && ' bg-gray-200 text-black'}`}
                                >
                                    <div className={` flex place-items-center gap-10 py-1`}>
                                        <div className={`w-[22px] h-[20px] flex place-items-center place-content-center  text-[20px]`}>
                                            {menu.icon}
                                        </div>
                                        <div className={`text-[13px]`}>
                                            {menu.title}
                                        </div>
                                    </div>
                                    <div>
                                        <CgChevronRight size={20} className='transition-all delay-0 duration-500 ease-in-out group-hover:rotate-90' />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MobileMenu
