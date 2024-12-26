import {NextRequest,NextResponse} from "next/server"
import * as jose from "jose"

export async function middleware(req:NextRequest,res:NextResponse){
    const bearerToken = req.headers.get("authorization") as string
    if(!bearerToken){
        return new NextResponse(
            JSON.stringify({errorMessage:"Unauthorized request"}),{status:401}
        )
    }
    const Token = bearerToken.split(" ")[1]
    if(!Token){
        return new NextResponse(
            JSON.stringify({errorMessage:"Unauthorized request"}),{status:401}
        )
        }
        //verify the token!
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)    
    try {
        await jose.jwtVerify(Token,secret);
    } catch (error) {
        return new NextResponse(
            JSON.stringify({errorMessage:"Unauthorized request"}),{status:401}
        )
    }
    }        
export const config ={
    matcher:["/api/auth/me"]
}