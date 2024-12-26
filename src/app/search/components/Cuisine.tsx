import { Price } from '@prisma/client';
import Link from 'next/link';
import React from 'react'
interface CuisinesProps{
    Cuisines:{
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}[],
    searchParams:{city?:string,cuisine?:string,price?:Price}
}
const Cuisine = ({Cuisines,searchParams}:CuisinesProps) => {
    return (
        <>
            <h1 className="text-black font-bold text-reg cursor-pointer">Cuisine</h1>
            {Cuisines.map((c)=><Link href={{
                pathname:"/search",
                query:{...searchParams,cuisine:c.name}
            }} className="text-black capitalize cursor-pointer hover:font-bold flex flex-col" key={c.id}>{c.name}</Link>)}
        </>
    )
}

export default Cuisine