import { Price } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
interface LocationProps{
    Locations:{
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}[],
    searchParams:{city?:string,cuisine?:string,price?:Price}
}

const Location = ({Locations,searchParams}:LocationProps) => {
    return (
        <>
        <h1 className="text-black font-bold text-reg cursor-pointer">Region</h1>
            {Locations.map((l)=><Link href={{
                pathname:"/search",
                query:{...searchParams,city:l.name}
            }} className="text-black capitalize cursor-pointer hover:font-bold flex flex-col" key={l.id}>{l.name}</Link>)}
        </>
    )
}

export default Location