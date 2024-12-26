import {NextApiRequest,NextApiResponse} from "next"
import * as jose from "jose"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
const Prisma = new PrismaClient()

export default async function handler (req:NextApiRequest,res:NextApiResponse){
    const bearerToken = req.headers["authorization"] as string
    const Token = bearerToken.split(" ")[1]
    const payload = jwt.decode(Token) as {email:string}
    if(!payload){
        return res.status(401).json({"errorMessage":"Unauthorized request"})
    }
    const user = await Prisma.user.findUnique({
        where:{
            email:payload.email
        },
        select:{
            id:true,
            first_name:true,
            last_name:true,
            email:true,
            phone:true,
        }
    })



    return res.status(200).json({me:user})
}