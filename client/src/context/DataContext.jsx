import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContext=createContext()
export const DataProvider=({children})=>{
    const [apiData,setApiData]=useState([])
    const [loading,setLoading]=useState(true)
    const [isLoggedIn,setIsLoggedIn]=useState(false)

   useEffect(()=>{
    const token=localStorage.getItem("token")
     setIsLoggedIn(!!token)
   },[])

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const apiUrl="http://localhost:8080"
                const response=await axios.get(apiUrl)
                if(response.status===200)
                {
                    if(response.data.StatusText==="OK")
                    {
                        setApiData(response.data.blog_records)
                    }
                }
                setLoading(false)
            }
            catch(error){
                setLoading(false)
                console.log(error?.response || error.message);
            }
        }
        fetchData()
    },[]);
    return(
        <DataContext.Provider value={{apiData,loading,isLoggedIn,setIsLoggedIn}}>
          {children}
        </DataContext.Provider>
    )

};