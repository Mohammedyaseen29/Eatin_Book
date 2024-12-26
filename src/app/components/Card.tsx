import Link from 'next/link'
import React from 'react'
import { restaurantCard } from '../page'
import PriceComponent from './PriceComponent'
import Star from './Star'
interface Props{
    restaurant:restaurantCard
}

const Card = ({restaurant}:Props) => {
    return (
    <Link href={`/restaurant/${restaurant.slug}`}>
    <div className="py-6 rounded shadow-xl cursor-pointer hover:scale-105 px-2">
        <img src={restaurant.main_images} alt="" className="w-full h-36"/>
        <div className="text-black text-xl font-bold mt-2">{restaurant.name}</div>
        <div className='flex'>
            <span className="text-black mr-2"><Star reviews={restaurant.reviews}/></span>
            <span className="text-black text-sm font-light">{restaurant.reviews.length} review{restaurant.reviews.length > 1 ?"s":""}</span>
        </div>
        <p className="text-black font-semibold">{restaurant.cuisine.name}</p>
        <PriceComponent price={restaurant.price}/>
        <p className='text-black font-semibold'>{restaurant.location.name}</p>
        
    </div>
    </Link>
    )
}

export default Card;