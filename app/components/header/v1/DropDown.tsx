import React from 'react'
import AccountUser from './AccountUser'
import AccountSettings from './AccountSettings'
import AccountSignout from './AccountSignout'


const DropDown = ({ open }: any) => {
    return (
        <div>
            {
                open &&
                <div className={`absolute z-[1000]`}>
                    <div className={`relative`}>
                        <div className={`absolute right-[-25px] top-[5px]`}>
                            <div className={`w-[250px] bg-white rounded-xl p-[5px] 
                            shadow-lg
                                shadow-black/30`}>
                                <AccountUser />
                                <div className={`px-[10px] my-1`}>
                                    <hr />
                                </div>
                                <div>
                                    <AccountSettings />
                                    <AccountSignout />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            }
        </div >
    )
}

export default DropDown
