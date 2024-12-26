import Link from 'next/link'
import React from 'react'
import { PrismaClient, Review } from '@prisma/client';
import PriceComponent from '@/app/components/PriceComponent';
import { RatingCalculate } from '../../../../utils/RatingCalculate';
import Star from '@/app/components/Star';
interface Props{
    id: number;
    name: string;
    main_images: string;
    slug: string;
    price: $Enums.Price;
    location: {
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    };
    cuisine: {
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    };
    reviews:Review[];
}
const RestaurantDetail = ({Data}:Props) => {
    function ratingCategory(){
        const ratings = RatingCalculate(Data.reviews)
        if(ratings > 4) return "Awesome!"
        else if(ratings >=3 && ratings<=4 ) return "Good!"
        else return "Average!"
    }
    return (
        <div className="flex space-x-5 bg-gray-100 border ml-10 pb-3 ">
            <div className="ml-20 mt-5">
                <img src={Data.main_images} alt="" className="w-48 h-32 rounded"/>
            </div>
            <div className="mt-5">
                <h1 className="text-black">{Data.name}</h1>
                <div className='flex mt-2'>
                    <span className="text-black mr-2"><Star reviews={Data.reviews}/></span>
                    <span className="text-black font-medium text-sm">{ratingCategory()}</span>
                </div>
                <div className="flex space-x-4 mt-2">
                <PriceComponent price={Data.price}/>
                <p className="text-black text-sm capitalize">{Data.cuisine.name}</p>
                <p className="text-black text-sm capitalize">{Data.location.name}</p>
                </div>
                <Link href={`/restaurant/${Data.slug}`}><p className="text-red-500 mt-4">View more information</p></Link>
            </div>
        
            </div>
    )
    }

export default RestaurantDetail