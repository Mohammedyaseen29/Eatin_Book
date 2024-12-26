
import axios from "axios"
import { useContext } from "react"
import { AuthenticationContext } from "../context/AuthContext"
import { deleteCookie } from "cookies-next"


const useAuth = ()=>{
    const {data,loading,error,SetAuthState} = useContext(AuthenticationContext)
    const signin = async ({email,password}:{email:string,password:string},handleClose:()=>void)=>{
        SetAuthState({
            loading:true,
            data:null,
            error:null,
        })
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signin",{email,password})
            SetAuthState({
            loading:false,
            data:response.data,
            error:null,
        })
        handleClose()
            
        } catch (error:any) { 
            SetAuthState({
            loading:false,
            data:null,
            error:error.response.data.errorMessage,
        })
            
            
        }
    }
    const signup = async ({email,password,first_name,last_name,phone,city}:{email:string,password:string,first_name:string,last_name:string,phone:string,city:string},handleClose:()=>void)=>{
        SetAuthState({
            loading:true,
            data:null,
            error:null,
        })
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup",{email,password,first_name,last_name,phone,city})
            
            SetAuthState({
                loading:false,
                data:response.data,
                error:null,
            })
            handleClose()
        } catch (error:any) {
            
            SetAuthState({
                loading:false,
                data:null,
                error:error.response.data.errorMessage,
            })
        }
    }
    const signOut = ()=>{
        deleteCookie("jwt")
        SetAuthState({
                loading:false,
                data:null,
                error:null,
            })
    }

    return{signin,signup,signOut}


}
export default useAuth;