import { Link } from '@remix-run/react'
import React from 'react'

const MainLogo = () => {
    return (
        <>
            <Link to={'/'}>
                <div className={`flex place-items-center w-fit text-[21px] tracking-tight gap-[2px] font-extrabold font-sans place-content-between`}>

                    <div className={`text-blue-800 first-letter:`}>
                        <i>b</i>ycet.
                    </div>

                    <div className={``}>
                        <span className='italic font-serif'>i</span>ndex
                    </div>
                </div>
            </Link>
        </>
    )
}

export default MainLogo
