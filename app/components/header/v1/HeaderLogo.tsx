import { Link } from '@remix-run/react'
import React from 'react'

const HeaderLogo = () => {
    return (
        <div className={`text-3xl font-extrabold font-sans tracking-tight text-[#6001D2]`}>
            <Link to={`/`}>
                <i>b</i>ycet
            </Link>
        </div>
    )
}

export default HeaderLogo
