import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";

import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProfileDropdown=()=>{
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-center w-full rounded-md hover:font-bold shadow-sm px-4 py-2 bg-orange-500 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Profile
        <svg
          className="ml-2 -mr-1 h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200"
            >
              Create Blog
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200"
            >
              myBlog
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
}


const Navbar = () => {  
  const [user, setUser] = useState(null);
  const list = [
    { item: "Home", url: "/" },
    { item: "Services", url: "services" },
    { item: "About", url: "about" },
    { item: "Blogs", url: "all" },
    { item: "Contact", url: "contact" },
  ];
  return (
    <div className="max-w-full font-roboto-serif bg-black">
      <div className="max-w-full px-10 py-6 flex justify-between items-center ">
        <h1 className=" text-3xl text-amber-50 text-center py-2 font-pacifico">
          Blog<span className="text-orange-600">Verse</span>
        </h1>

        <ul className="flex justify-center items-center gap-6  text-white font-semibold cursor-pointer ">
          {list.map((item, ind) => (
            <li key={item.url}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 underline font-semibold"
                    : "transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-violet-600"
                }
              >
                {item.item}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex space-x-2 items-center justify-center">
          <div className="flex text-white space-x-2 text-md">
            <FaFacebook />
            <CiTwitter />
            <FaWhatsapp />
          </div>
          {user === null ? (
            <div>
              <Link to="login">
              <button className="bg-orange-500 text-white font-semibold cursor-pointer rounded-md hover:bg-orange-400 transition px-3 py-1">
                Login
              </button>
              </Link>
              
            </div>
          ) : (
             <ProfileDropdown/>           
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
