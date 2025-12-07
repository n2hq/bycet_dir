import { config } from "~/lib/lib"

export const AltCard = ({ b }: any) => {
    const fallbackImg = `/images/fallbackBusinessImg.png`
    return (
        <div>
            <h2 className={`text-2xl font-normal text-[#1a0dab] group-hover:underline`}>

                {b.title}



            </h2>
            <p>{b.address_one} {b.address_two && `, ${b.address_two}`}</p>


            <div className={`flex gap-2 place-items-start place-content-start`}>
                <div className={`relative min-w-[60px] w-[60px] h-[60px] bg-blue-300 mt-[5px] shadow-lg shadow-gray-300`}>
                    <img src={
                        b.image_url ?
                            config.IMG_BASE_URL + b.image_url :
                            fallbackImg
                    }
                        alt=""
                        className={`object-cover w-full h-full border`}
                    />
                </div>
                <div className={` h-full`}>
                    {b.short_description}
                </div>
            </div>

            {
                b?.phone &&
                <div className="text-sm mt-2 hover:underline">
                    <a href={`tel:${b.phone}`}>📞 {b.phone}</a>
                </div>
            }

            <div className="text-sm mt-2 hover:underline">
                <a href={`mailto:${b?.email_address}`}>📨 Contact via email: {b?.email_address}</a>
            </div>

        </div>
    )
}