import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <button className="bg-orange-500 text-white font-semibold cursor-pointer rounded-md hover:bg-orange-400 transition px-3 py-1">
            Login
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Navbar;
