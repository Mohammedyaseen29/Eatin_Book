import React from 'react'
import Link from 'next/link'
import ItemsCard from '../components/ItemsCard'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
export interface menuType{
    id: number;
    name: string;
    price: string;
    description: string;
    restaurant_id: number;
}



async function fetchItem({slug}:{slug:string}){
    const fetched = await prisma.restaurant.findUnique({
        where:{slug},
        select:{
            items:true,
        }
    })
    if(!fetched){
        throw new Error();
    }
    return fetched.items

}   

const  Menu = async ({params}:{params:{slug:string}}) => {
    const fetchedItem = await fetchItem({slug:params.slug});
    return (
        <>
            <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-5">
            <div className="flex justify-center mt-10">
            <h1 className="text-white font-bold text-2xl md:text-4xl">{params.slug}</h1>
            </div>
        </div>
        <div className="flex justify-center mr-16">
            <div className="-mt-7 w-[40%] bg-white shadow-2xl">
            <nav className="flex p-2 cursor-pointer border-b border-1 border-gray-300">
                <Link href={`/restaurant/${params.slug}`} className="text-black mr-4 text-xs hover:text-red-700 hover:font-bold">Overview</Link>
                <Link href={`/restaurant/${params.slug}/menu`}className="text-black text-xs hover:text-red-700 hover:font-bold">Menus</Link>
            </nav>
            <div className="p-2">
                <h1 className="text-black text-xl font-semibold">Menu</h1>
            </div>
            <div className="flex flex-wrap justify-between p-2">
                {fetchedItem.length >=1 ? (fetchedItem.map((menu:menuType)=><ItemsCard key={menu.id} menu={menu}/>)):(<p className='ml-20 mb-5 text-red-500 font-semibold'>there is no menu in this restaurant</p>)}
            </div>
            </div>
        </div>
        </>
            
    
    )
}

export default Menu;