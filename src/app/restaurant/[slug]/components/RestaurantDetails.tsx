import Link from 'next/link'
import React from 'react'
import Star from '@/app/components/Star'
import { RestaurantType } from '../page'
import { RatingCalculate } from '../../../../../utils/RatingCalculate'
import ReviewsCard from './ReviewsCard'
interface restaurantDetailsProp{
    restaurantDetails:RestaurantType
}
const RestaurantDetails = ({restaurantDetails}:restaurantDetailsProp) => {
    return (
        <div className="-mt-7 w-[40%] bg-white shadow-2xl">
            <nav className="flex p-2 cursor-pointer border-b border-1 border-gray-300">
                <Link href={`/restaurant/${restaurantDetails.slug}`} className="text-black mr-4 text-xs hover:text-red-700 hover:font-bold">Overview</Link>
                <Link href={`/restaurant/${restaurantDetails.slug}/menu`} className="text-black text-xs hover:text-red-700 hover:font-bold">Menus</Link>
            </nav>
            {/* heading */}
            <div className="p-2">
                <div className="border-b border-1 border-gray-100 pb-10">
                <h1 className="text-gray-900 text-4xl font-semibold">{restaurantDetails.name}</h1>
                </div>
                {/* heading */}
                <div className="flex items-center mt-2">
                <span className="text-black mr-2"><Star reviews={restaurantDetails.reviews}/></span>
                <span className="text-gray-900 mr-2 text-xs font-semibold">{RatingCalculate(restaurantDetails.reviews).toFixed(1)}</span>
                <span className="text-gray-900 text-xs font-semibold">{restaurantDetails.reviews.length} Review{restaurantDetails.reviews.length > 1 ? "s" : ""}</span>
                </div>
                <div>
                <p className="text-gray-500 text-reg mt-5">{restaurantDetails.description}</p>
                </div>
                <div className="mt-10 border-b border-1 border-gray-300">
                <h1 className="text-black text-lg font-bold pb-3">{restaurantDetails.images.length} photo{restaurantDetails.images.length > 1?"s":""}</h1>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-3 border-b border-1 border-gray-300 pb-5">
                {restaurantDetails.images.map((image,index)=><img key={index} src={image} alt="" className="hover:scale-105 w-full h-40" />)}
                
                </div>
                {/* Review */}
                <div className="mt-5 pb-10">
                <h1 className="text-black text-2xl">What {restaurantDetails.reviews.length > 1 ? "peoples":"person"} Tell About Us?</h1>
                <div className=" mt-10">
                    {!restaurantDetails.reviews.length ? <p className='text-red-500 ml-10'>There is no review yet😮‍💨!</p> : <>{restaurantDetails.reviews.map((review)=><ReviewsCard  review={review} key={review.id}/>)}</>}
                </div>
                </div>
                {/* Review */}
            </div>
            </div>
    )
}

export default RestaurantDetails