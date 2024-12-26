import { NextApiRequest, NextApiResponse } from "next";
import {times} from "../../../../data/times"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {slug,day,time,partySize} = req.query as {
        slug:string,
        day:string,
        time:string,
        partySize:string
    }
    if(!day || !time || !partySize){
        return res.status(400).json({errorMessage:"Invalid parameter brother!"})
    }
    const searchTimes = times.find((t)=>{
        return t.time === time;
    })?.searchTimes

    if(!searchTimes){
        res.status(400).json({errorMessage:"we Dont find the search times!!"})
    }
    const bookings = await prisma.booking.findMany({
        where:{
            booking_time:{
                gte: new Date(`${day}T${searchTimes[0]}`),
                lte: new Date(`${day}T${searchTimes[searchTimes.length-1]}`)
            }
        },
        select:{
            no_of_people:true,
            booking_time:true,
            tables:true
        }
    });
    const bookingTablesObj: {[key:string]: {[key:number]:true}}={};
    bookings.forEach(booking=>{
        bookingTablesObj[booking.booking_time.toISOString()] = booking.tables.reduce((obj,table)=>{
            return {
                ...obj,
                [table.tables_id]:true
            }
        },{})
    })
    const restaurant = await prisma.restaurant.findUnique({
        where:{
            slug
        },
        select:{
            tables:true,
            open_time:true,
            close_time:true,
        }
    })
    if(!restaurant){
        res.status(400).json({errorMessage:"invalid Data"})
    }
    const tables = restaurant?.tables;
    const searchTimesWithTables = searchTimes?.map(searchTimes=>{
        return{
            date: new Date(`${day}T${searchTimes}`),
            time:searchTimes,
            tables
        }
    })
    searchTimesWithTables?.forEach(t=>{
        t.tables = t.tables?.filter(table =>{
            if(bookingTablesObj[t.date.toISOString()]){
                if(bookingTablesObj[t.date.toISOString()][table.id]) return false
            }
            return true
        })
    })
    //availability
    const availabilities = searchTimesWithTables?.map(t=>{
        const sumSeats = t.tables?.reduce((sum,table)=>{
            return sum + table.seats
        },0);
        return{
            time:t.time,
            available: sumSeats >= parseInt(partySize)
        }
    }).filter(availability=>{
        const timeIsAfteropeningHour = new Date(`${day}T${availability.time}`) >= new Date(`${day}T${restaurant?.open_time}`)
        const timeIsBeforeopeningHour = new Date(`${day}T${availability.time}`) <= new Date(`${day}T${restaurant?.close_time}`)
        return timeIsAfteropeningHour && timeIsBeforeopeningHour
    })
    
    return res.json({availabilities})
}