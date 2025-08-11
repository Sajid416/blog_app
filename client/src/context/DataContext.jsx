import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContext=createContext()
export const DataProvider=({children})=>{
    const [apiData,setApiData]=useState([])
    const [loading,setLoading]=useState(true)
    const [isLoggedIn,setIsLoggedIn]=useState(false)

   useEffect(()=>{
    const token=localStorage.getItem("token")
     if (token) {
      try {
        // Decode token without verifying signature
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Math.floor(Date.now() / 1000); // current time in seconds

        if (payload.exp && payload.exp > now) {
          setIsLoggedIn(true);
        } else {
          // Token expired
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }
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