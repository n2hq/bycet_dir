import React, { useContext, useEffect } from 'react'
import { CgMenu } from 'react-icons/cg'
import MainNavContext, { useMainNav } from '~/context/MainNavContext'
import MobileMenu from './MobileMenu'

const Hamburger = () => {
    const menuCtx = useMainNav()



    return (
        <div className={`text-2xl`}>
            <div className={`z-[10000]`}>
                <MobileMenu openMenu={menuCtx?.isOpen} closeNav={menuCtx?.closeMenu} />
            </div>
            <div
                className={`cursor-pointer`}
                onClick={() => menuCtx?.showMenu()}>
                <CgMenu />
            </div>

        </div>
    )
}

export default Hamburger
