"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from "react";
const Searchcmp = () => {
    const router = useRouter();
    const [location,setlocation] =useState("")
    return (
        <>
        <input type="text" placeholder="Location, Restaurant, or Cuisine" value={location} onChange={(e)=>setlocation(e.target.value)} className="text-black rounded px-3 py-2 overflow-hidden mb-3 md:mb-0 md:mr-3 w-full md:w-64 focus:outline-none hover:right-1 hover:ring" />
        <button className="bg-red-500 rounded px-4 py-1  md:px-2 md:py-2 hover:scale-105" onClick={()=>{
        if(location===""){
            return
        }
        else{   
            router.push(`/search?city=${location}`)
            setlocation("");
        }
        }}>Let's go</button>
        </>
    )
}

export default Searchcmp