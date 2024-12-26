import React from 'react'

import Sidebar from './components/Sidebar'
import RestaurantDetail from './components/RestaurantDetail'
import { Price, PrismaClient } from '@prisma/client'
import Searchcmp from '../components/Searchcmp';

const prisma = new PrismaClient();

interface SearchParams {city?:string,cuisine?:string,price?:Price}
const select = {
            id:true,
            name:true,
            cuisine:true,
            location:true,
            main_images:true,
            price:true,
            slug:true,
            reviews:true
        }


async function fetchingRestaurantBycity(searchParams:SearchParams){
    const where:any = {};

if(searchParams.city){
    const location ={
        name:{
            equals:searchParams.city.toLowerCase()
        }
    }
    where.location = location
    }

if(searchParams.cuisine){
    const cuisine ={
        name:{
            equals:searchParams.cuisine.toLowerCase()
        }
    }
    where.cuisine = cuisine
    }
if(searchParams.price){
    const price ={
        equals:searchParams.price
    }
    where.price = price
    }        

    return prisma.restaurant.findMany({
        where,
        select,
    })
}
async function locationFetch(){
    const fetchingLocation = await prisma.location.findMany()
    return fetchingLocation;
}
async function cuisineFetch(){
    const fetchingCuisine = await prisma.cuisine.findMany()
    return fetchingCuisine;
}



async function search({searchParams}:{searchParams:SearchParams}) {
    const restaurant = await fetchingRestaurantBycity(searchParams)
    const Location = await locationFetch()
    const Cuisine = await cuisineFetch()
    return (
        <>
        <div className="bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-4">
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
            <Searchcmp/>
            </div>
        </div>
        <div className="flex">
            <div className="w-1/4">
                <Sidebar locations={Location} cuisines={Cuisine} searchParams={searchParams} />
        </div>
        <div className="w-2/3 ">
            { restaurant.length ? <>{restaurant.map((r)=> <RestaurantDetail Data={r}  />)}</> :<p className='text-red-500 text-center font-semibold mt-10 mr-64'>We dont find any hotels 🫠</p> }
        </div>
        </div>
        </>
        
        
        

    )
}

export default search