import React from 'react'
import { FiYoutube } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  const list=["Home","Blog","About","Contact"]
  return (
    <div className='min-h-fit bg-violet-600 flex justify-between'>
      <ul className='flex justify-baseline gap-4 pl-12 text-amber-50 font-semibold py-5'>
        {
          list.map((item,ind)=>(
            <li key={ind}>
              {item}
            </li>
          ))
        }
      </ul>
      <div className='flex flex-col text-lg text-amber-50 font-semibold pr-45 py-5 items-center'>
        <p>Connect With US</p>
        <div className="flex justify-center gap-3">
        {/* YouTube */}
        <a
          href="#"
          className="bg-white rounded-full p-4 shadow-lg text-red-600 hover:scale-110 hover:shadow-2xl transition-all duration-300"
        >
          <FiYoutube size={24} />
        </a>

        {/* WhatsApp */}
        <a
          href="#"
          className="bg-white rounded-full p-4 shadow-lg text-green-600 hover:scale-110 hover:shadow-2xl transition-all duration-300"
        >
          <IoLogoWhatsapp size={24} />
        </a>

        {/* LinkedIn */}
        <a
          href="#"
          className="bg-white rounded-full p-4 shadow-lg text-blue-700 hover:scale-110 hover:shadow-2xl transition-all duration-300"
        >
          <FaLinkedin size={24} />
        </a>
    
      </div>
      </div>
    </div>
    
  )
}

export default Footer
