import {NextApiRequest,NextApiResponse} from "next"
import validator from "validator"
import bcrypt from "bcrypt"
import * as jose from "jose"
import { PrismaClient } from "@prisma/client"
import {setCookie} from "cookies-next"
const Prisma = new PrismaClient();

export default async function Signin(req:NextApiRequest,res:NextApiResponse){
    if(req.method === "POST"){
        const {email,password} = req.body;
        const errors: string[] = [];
        const validateSchema = [
            {
                valid:validator.isEmail(email),
                errorMessage:"Invalid email!"
            },
            {
                valid:validator.isLength(password,{min:1}),
                errorMessage:"Invalid Password!"
            }
        ]
        validateSchema.forEach((check)=>{
            if(!check.valid){
                errors.push(check.errorMessage)
            }
        })
        if(errors.length){
            return res.status(400).json({errorMessage:errors[0]})
        }
        const userwithEmail = await Prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!userwithEmail){
            return res.status(403).json({errorMessage:"User with this Email doesn't exist."})
        }
        const issameEmail = await bcrypt.compare(password,userwithEmail.password)
        if(!issameEmail){
            return res.status(403).json({errorMessage:"User password is incorrect!!."})
        }
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const alg = "HS256"
        const Token = await new jose.SignJWT({email:userwithEmail.email}).setProtectedHeader({alg}).setExpirationTime("24h").sign(secret)
        setCookie("jwt",Token,{req,res,maxAge:60 * 6 * 24})


        return res.status(200).json({
        firstname:userwithEmail.first_name,
        lastname:userwithEmail.last_name,
        email:userwithEmail.email,
        phone:userwithEmail.phone,
        city:userwithEmail.city
    })
    }
    return res.status(400).json("You came to wrong endpoint redirect to correct endpoint")

}