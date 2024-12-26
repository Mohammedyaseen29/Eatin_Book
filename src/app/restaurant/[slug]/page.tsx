import React from 'react'
import Header from './components/Header'
import RestaurantDetails from './components/RestaurantDetails'
import ReservationCard from './components/ReservationCard'
import { PrismaClient, Review } from '@prisma/client'
const prisma = new PrismaClient();
export interface RestaurantType{
    id: number;
    name: string;
    images: string[];
    description: string;
    slug: string;
    reviews:Review[];
    open_time:string;
    close_time:string
}

async function fetchRestaurantbySlug(slug:string):Promise<RestaurantType> {
    const restaurant = prisma.restaurant.findUnique({
        where:{
            slug,
        },
        select:{
            id : true ,
            name :true  ,
            slug:true,
            description:true,
            images:true,
            reviews:true,
            open_time:true,
            close_time:true,
        }

    });
    if(!restaurant){
        throw new Error()
    }
    return restaurant;

    
};


async function Restaurant({params}:{params:{slug:string}}){

    const RenderRestaurant = await fetchRestaurantbySlug(params.slug)
    // console.log({RenderRestaurant});
    
    
return (
            
        <>
        <Header HeaderName={RenderRestaurant} />
        <div className="flex justify-center mr-16 gap-10">
            <RestaurantDetails restaurantDetails={RenderRestaurant} />
            <ReservationCard openTime={RenderRestaurant.open_time} closeTime={RenderRestaurant.close_time} slug={RenderRestaurant.slug}/>
        </div>
        </>
    )
    }
export default Restaurant