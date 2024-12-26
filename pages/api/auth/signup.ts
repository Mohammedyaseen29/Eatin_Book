import {NextApiRequest,NextApiResponse} from "next"
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import * as jose from "jose"
import { setCookie } from "cookies-next";
const Prisma = new PrismaClient


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if (req.method === "POST"){
        const {firstname,lastname,email,phone,password,city} = req.body;
        const errors: string[] = [];
        const validatorSchema = [
            {
                valid:validator.isLength(firstname,{
                    min:1,
                    max:20,
                }),
                errorMessage:"First Name is invalid"
            },
            {
                valid:validator.isLength(lastname,{
                    min:1,
                    max:20,
                }),
                errorMessage:"Last Name is invalid"
            },
            {
                valid:validator.isEmail(email),
                errorMessage:"Email is invalid"
            },
            {
                valid:validator.isMobilePhone(phone),
                errorMessage:"Phone Number is invalid"
            },
            {
                valid:validator.isStrongPassword(password),
                errorMessage:"Create a strong password! using special character,capitalize and with numbers"
            },
            {
                valid:validator.isLength(city,{
                    min:1,
                    max:10,
                }),
                errorMessage:"city is invalid"
            }
        ]
        validatorSchema.forEach((check)=>{
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
        if (userwithEmail){
            return res.status(400).json({errorMessage:"Account is already Exist"})
        }
        const hashingPassword = await bcrypt.hash(password,15)
        
        const user = await Prisma.user.create({
            data: {
                first_name:firstname,
                last_name:lastname,
                email,
                phone,
                password:hashingPassword,
                city
            }
        })
        const alg = "HS256"
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const Token = await new jose.SignJWT({email:user.email}).setProtectedHeader({alg}).setExpirationTime("24h").sign(secret)
        setCookie("jwt",Token,{req,res,maxAge:60 * 6 * 24})

        return res.status(200).json({
        firstname:user.first_name,
        lastname:user.last_name,
        email:user.email,
        phone:user.phone,
        city:user.city,
    })
    } 
    return res.status(400).json("You came to wrong endpoint redirect to correct endpoint")
}