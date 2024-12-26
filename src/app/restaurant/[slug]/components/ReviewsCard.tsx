import { Review } from '@prisma/client'
import React from 'react'
import Star from '@/app/components/Star'

const ReviewsCard = ({review}:{review:Review}) => {
    return (
        <>
        <div className='flex mt-8 border-t border-gray-200 py-2'>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <h1 className="p-4 font-semibold text-white uppercase hover:cursor-pointer">{review.first_name[0]}{review.last_name[0]}</h1>
                    </div>
                    <div className="ml-5">
                    <h1 className="text-black text-medium font-semibold">{review.first_name} {review.last_name}</h1>
                    <div className="text-black mt-2 mb-3"><Star reviews={[]} rating={review.rating}/></div>
                    <p className="text-gray-500 text-sm">{review.text}</p>
        </div>
        </div>
        </>
    )
}

export default ReviewsCard