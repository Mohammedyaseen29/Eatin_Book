
import {useState} from "react"
import axios from "axios";

export default function useAvailability() {
    const[loading,setLoading] = useState(false);
    const[data,setData] = useState(null);
    const[error,setError]=useState(null);


    const fetchAvailability = async({slug,day,time,partysize}:{slug:string,day:string,time:string,partysize:string})=>{
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/restaurant/${slug}/availability`,{
                params:{
                    day,
                    time,
                    partysize
                }
            })
            setLoading(false)
            return setData(response.data)
        } catch (error:any) {
            setLoading(false)
            return setError(error.response.data.errorMessage)

        }
    }
    return {data,loading,error,fetchAvailability}
}