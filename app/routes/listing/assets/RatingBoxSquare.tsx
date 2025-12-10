import { useEffect, useState } from "react"
import { BiSolidStar as Star } from "react-icons/bi"

type RatingBoxProps = {
    rating: number // e.g., 3.6
}

export default function RatingBoxSquare({ rating }: RatingBoxProps) {


    return (
        <div className="flex gap-x-[3px]">
            {Array.from({ length: 5 }).map((_, i) => {
                const fillPercent = Math.max(0, Math.min(1, rating - i)) * 100

                return (
                    <div
                        key={i}
                        className={`relative w-[20px] h-[20px] ${rating > 0 ? 'bg-gray-200' : 'bg-gray-300'} rounded 
                            overflow-hidden flex place-items-center
                            place-content-center`}
                    >
                        <div
                            className={`absolute inset-0 bg-[#FF8742] text-white  z-[0]`}
                            style={{ width: `${fillPercent}%` }}
                        />
                        <Star className={`relative z-[0] w-[14px] h-[14px] text-white `} fill="currentColor" />
                    </div>
                )
            })}
        </div>
    )
}
