import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import UpdateBlog from "./UpdateBlog";
import { Link, useNavigate } from 'react-router-dom';

const MyBlog = () => {
  const [author, setAuthor] = useState(false);
  const {fetchData}=useContext(DataContext)
  const [filterData, setFilterData] = useState([]);
  const token = localStorage.getItem("token");
  const navigate=useNavigate()

  const handledata = async () => {
    try {
      if(!token){
        console.log("please enter token first")
        return
      }
      const res = await axios.get("http://localhost:8080/api/myblog", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFilterData(res.data);
      setAuthor(true);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/myblog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFilterData((prev) => prev.filter((item) => item.id !== id));
      handledata();
      fetchData();
      console.log("Blog deleted successfully!!");
    } catch (error) {
      console.error("Error in Blog deleted", error);
      alert("Something went wrong");
    }
  };
  return (
    <div className="p-10 min-h-screen">
      <div>
        {/* Search Form */}

        <button
          onClick={handledata}
          className="text-white bg-blue-500 px-3 py-2 rounded-lg hover:bg-blue-400 transition cursor-pointer font-semibold"
        >
          View Blog List
        </button>
        <div className={author ? " p-5" : "hidden"}>
          {author && filterData.length > 0 ? (
            <div className="flex flex-col  ">
              {filterData.map((record, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-5 border border-gray-400 rounded-lg p-5 w-[100%] justify-between"
                >
                  <p className=" text-md font-bold font-roboto-serif">
                    {record.title}
                  </p>
                  <div className="flex flex-row gap-2">
                    <button className="text-md rounded-lg text-white bg-green-500 font-semibold px-2 py-1 cursor-pointer" onClick={()=>navigate(`/blog/update/${record.id}`)}>
                      Update blog 
                    </button>
               
                    <button
                      className="text-md rounded-lg bg-red-500 text-white font-semibold px-2 py-1 cursor-pointer"
                      onClick={() => handleDelete(record.id)}
                    >
                      Delete blog
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 p-5 text-lg">Blog Not Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBlog;
