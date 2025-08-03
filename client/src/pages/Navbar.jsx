import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const Navbar = () => {
  const list = [
    { item: "Home", url: "all" },
    { item: "Services", url: "services" },
    { item: "About", url: "about" },
    { item: "Blogs", url: "blog/:id" },
    { item: "Contact", url: "contact" },
  ];
  return (
    <div className="max-w-full font-roboto-serif bg-black">
      <div className="max-w-full px-10 py-6 flex justify-between items-center ">
        <h1 className=" text-3xl text-amber-50 text-center py-2">
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
      <div className="text-white max-w-2xl mx-auto h-40 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Welcome To Our Blog Website
          </h1>
          <p className="mb-4 text-sm">
            Start your Blog today and join a community of writers and readers
            who are passionate about sharing their stories and ideas. We offer
            everything you need to get started, from helpful tips and tutorials.
          </p>

          <div className="flex items-center justify-center gap-2 text-md leading-none mb-3">
            <span>Learn more</span>
            <FaArrowRightLong className="mt-[2px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
