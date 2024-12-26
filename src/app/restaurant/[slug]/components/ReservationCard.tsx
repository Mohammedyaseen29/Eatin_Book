"use client"
import React, { useState } from 'react'
import { partysize } from '../../../../../data/partysize'
import { times } from '../../../../../data/times'
import useAvailability from '../../../../../hooks/useAvailability'



const ReservationCard = ({openTime,closeTime,slug}:{openTime:string,closeTime:string,slug:string}) => {
    
    const {data,loading,error,fetchAvailability} = useAvailability();
    const[time,setTime] = useState(openTime)
    const[partySize,setPartySize] = useState("2")
    const [day, setDay] = useState<string>("");
    function filterTime(){
        const RestaurantOpenTime : typeof times = [];
        let Gatepass = false;
        times.forEach((time)=>{
            if(time.time === openTime){
                Gatepass = true;
            }
            if(Gatepass){
                RestaurantOpenTime.push(time)
            }
            if(time.time === closeTime){
                Gatepass = false
        }
        })
        return RestaurantOpenTime
    }
    function handleClickReserve(){
        fetchAvailability({
            slug,
            day,
            time,
            partysize:partySize
        })
    }
    return (
        <div className="-mt-7 w-[20%] bg-white h-[40%] shadow-2xl">
            <h1 className="text-black text-center pb-2 font-bold border-b border-1 border-gray-300">Make Reservation</h1>
            <div className="p-4 flex flex-col border-b border-1 border-gray-300 ">
                <label htmlFor="" className="text-black text-sm font-semibold">Party Size</label>
                <select name="Persons" id="" className="text-black border-2 border-gray-300 rounded-full p-2 mt-2" value={partySize} onChange={(e)=>{setPartySize(e.target.value)}}>
                {partysize.map((size)=>{
                    return <option value={size.value}>{size.label}</option>
                })}
                </select>
            </div>
            <div className="flex gap-3 border-b border-1 border-gray-300 p-2">
                <div className="flex flex-col left">
                <label htmlFor="" className="text-black text-sm font-semibold">Date</label>
                <input type="date"  className="border-2 border-gray-300 rounded-full p-1  text-black mt-2" value={day} onChange={(e)=>{setDay(e.target.value)}}/>
                </div>
                <div className="right flex flex-col">
                <label htmlFor="" className="text-black text-sm font-semibold">Time</label>
                <select name="Time" id="" className="text-black border-2 border-gray-300 rounded-full p-2  mt-2" value={time} onChange={(e)=>{setTime(e.target.value)}}>
                {filterTime().map((time)=>{
                    return <option value={time.time}>{time.displayTime}</option>
                })}
                </select>
                </div>
            </div>
            <div className="text-center mt-5 p-5">
                <button className="bg-red-500 text-white px-4 py-2 rounded-full font-bold hover:scale-95" onClick={handleClickReserve}>Find a Time</button>
            </div>
        </div>
        
    )
}

export default ReservationCard