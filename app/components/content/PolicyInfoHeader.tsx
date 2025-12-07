import React from 'react'

export type PolicyInfoHeaderProps = {
    title: string
    subTitle: string
    description: string
}

const PolicyInfoHeader = ({ title, subTitle, description }: PolicyInfoHeaderProps) => {
    return (
        <div className={`w-full px-[15px] bg-blue-50/30 py-24 border-b border-gray-200 `}>
            <div className={`max-w-[1200px] mx-auto w-full flex flex-col gap-y-6`}>
                <div className={`text-[13px] text-center uppercase`}>
                    {subTitle}
                </div>
                <div className={`text-[32px] text-center font-black leading-10 max-w-[80%] sm:max-w-[70%] md:max-w-[50%] lg:max-w-[45%] mx-auto tracking-tight`}>
                    {title}
                </div>
                <div className={`text-center text-[16px] text-gray-500 md:w-[80%] mx-auto`}>
                    {description}
                </div>

            </div>
        </div>
    )
}


export default PolicyInfoHeader
