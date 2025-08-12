import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useForm } from "react-hook-form";

const MyBlog = () => {
  const [author,setAuthor]=useState(false)
  const [filterData,setFilterData]=useState([])
  const {apiData=[],fetchData}=useContext(DataContext)

  const {
    register,
    handleSubmit
  }=useForm()
  
  const onSubmit=(e)=>{
    
    const blog=apiData.filter(data=>
      data.authorName.toLowerCase()===e.author.toLowerCase()
    )
    console.log(blog)
    setFilterData(blog)
   setAuthor(true)
  }

  const handleDelete=async(id)=>{

  }
  return (
    <div className="p-10 min-h-screen">
      <div>
        {/* Search Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
         <input type="text"
         placeholder="Enter author name"
         id="author"
         {...register("author",{required:true})}
         className="px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-500 transition"
         />
         <button type="submit" className="text-white bg-blue-500 px-3 py-2 rounded-lg hover:bg-blue-400 transition cursor-pointer font-semibold">View Blog List</button>
        </form>
        <div className={author? " p-5":"hidden"}>
          {
          (author && filterData.length>0)?  (
             <div className="flex flex-col  ">
              {
                filterData.map((record,index)=>(
                  <div key={index} className="flex flex-row gap-5 border border-gray-400 rounded-lg p-5 w-[90%]">
                    <p className="text-md font-bold font-roboto-serif">{record.title}</p>
                    <div className="flex flex-row gap-2">
                      <button className="text-md rounded-lg text-white bg-green-500 font-semibold px-2 py-1 cursor-pointer">Update blog</button>
                      <button className="text-md rounded-lg bg-red-500 text-white font-semibold px-2 py-1 cursor-pointer" onClick={handleDelete(record.id)}>Delete blog</button>
                    </div>
                  </div>
                ))
              }
             </div>
          ):
          (
            <div className="text-gray-500 p-5 text-lg">
              Blog Not Found
            </div>
          )
        }
        </div>
      </div>
    </div>
  );
};

export default MyBlog;
