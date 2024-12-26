"use client"

import { useState,createContext, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import axios from "axios"
import { getCookie } from "cookies-next"

interface User{
    id:number,
    first_name:string,
    last_name:string,
    password:string,
    phone:number,
    city:string
}

interface State{
    loading:boolean,
    error:string | null,
    data: User | null
}
interface AuthState extends State{
    SetAuthState: React.Dispatch<React.SetStateAction<State>>
}

export const AuthenticationContext = createContext<AuthState>({
    loading:true,
    error:null,
    data:null,
    SetAuthState: ()=>{}
})

export default function AuthContext({children}:{children:React.ReactNode}){
    const [AuthState,SetAuthState] = useState<State>({
        loading:true,
        error:null,
        data:null
    })
    const fetchUser = async()=>{
        const jwt = getCookie("jwt");
        if(!jwt){
            SetAuthState({
                loading:false,
                data:null,
                error:null,
            })
        }
        try {
            const response = await axios.get("http://localhost:3000/api/auth/me",{
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        })
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`
        SetAuthState({
            loading:false,
            data:response.data,
            error:null,
        })
        } catch (error:any) {
            SetAuthState({
            loading:false,
            data:null,
            error:error.response.data.errorMessage,
        })
        }
    }
    useEffect(()=>{
        fetchUser()
    },[])
    return(
        <AuthenticationContext.Provider value={{...AuthState,SetAuthState}}>
            {children}
        </AuthenticationContext.Provider>
    )
}