import React from 'react'
import Location from './Location'
import Cuisine from './Cuisine'
import { PrismaClient,Price } from '@prisma/client'
import Link from 'next/link'
interface PlaceProps{
    locations:{
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}[],
    cuisines:{
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}[],
    searchParams:{city?:string,cuisine?:string,price?:Price}
    }

const Sidebar = ({locations,cuisines,searchParams}:PlaceProps) => {
    return (
        <div className=" flex flex-col items-end gap-4">
            <div className="border-b border-1 border-gray-300 pb-4 mt-5 mr-6">
                <Location Locations={locations} searchParams={searchParams} />
            </div>
            <div className="mr-5 ">
                <Cuisine Cuisines={cuisines}  searchParams={searchParams}/>
            </div>
            <div>
            <h1 className="text-black font-bold">Prices</h1>
            <div className="flex mt-2 cursor-pointer">
                <Link href={{
                    pathname:"/search",
                    query:{...searchParams,price:Price.CHEAP}
                }} className="border p-1 text-black hover:font-bold scale-105">$</Link>
                <Link href={{
                    pathname:"/search",
                    query:{...searchParams,price:Price.REGULAR}
                }} className="border p-1 text-black hover:font-bold scale-105">$$</Link>
                <Link href={{
                    pathname:"/search",
                    query:{...searchParams,price:Price.EXPENSIVE}
                }} className="border p-1 text-black hover:font-bold scale-105">$$$</Link>
            </div>
            </div>
            </div>
    )
}

export default Sidebar