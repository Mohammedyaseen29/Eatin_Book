"use client"
import React from 'react'
import Link from 'next/link'
import RestaurantDetails from './components/RestaurantDetails'
import Form from './components/Form'
import { useRouter } from 'next/navigation'


const reserve = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center mr-10 mt-5 space-y-3">
            <p className="text-blue-500 text-sm font-bold mr-40 mb-3">You're almost Done!</p>
            <div className="flex space-x-5 ml-8">
                <RestaurantDetails />
            </div>
            <div className="grid grid-cols-2 gap-5 ml-10">
                <Form />
            </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded-full mt-3 disabled:bg-gray-300" onClick={()=>router.push("/success")}>Complete reservation</button>
        
        </div>
    )
}

export default reserve