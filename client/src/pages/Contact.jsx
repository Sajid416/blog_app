import React, { useRef } from "react";
import img from "../assets/img/contact.jpg";
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';


const Contact = () => {
  const form=useRef();

  const sendEmail=(e)=>{
    e.preventDefault();
    emailjs.sendEmail("service_b641t1g","template_ijbip7j",
      form.current,
      "zzEyGwvrfoRmCDL9V"
    )
    .then(()=>{
      alert("Email send Successfully")
      form.current.reset()
    })
    .catch((err)=>{
      console.error(err)
      alert("Something went wrong")
    })
  }

  return (
    <div className="p-10 w-full pl-3">
      <div className=" w-3/4 mx-auto flex flex-col gap-5">
        <h1 className="text-center text-4xl font-bold font-pacifico mb-2">
          Contact Us
        </h1>
        <div className="flex flex-row gap-6 p-5">
          <div className="w-[500px] h-[400px]">
            <img src={img} alt="Contact img" className="w-full h-full rounded-2xl object-cover object-[right]" />
          </div>
          <div>
            <form
              onSubmit={sendEmail}
              className="flex flex-col gap-5 pl-15 w-full max-w-sm"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="cName"
                  className="block text-gray-700 text-sm font-medium "
                >
                  FullName
                </label>
                <input
                  type="text"
                  id="cName"
                  {...register("cName",{required:true})}
                  aria-invalid={errors.cName? "true":"false"}
                  name="cName"
                  placeholder="Enter Your Name"
                  className="px-4 py-2 border border-gray-300 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                {errors.cName?.type==="required" && (
                  <p className="text-red-500 text-sm mt-1" role="alert">FullName is required</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium "
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email",{required:true})}
                  aria-invalid={errors.email? "true":"false"}
                  name="email"
                  placeholder="Enter Your Email Address"
                  className="px-4 py-2 border border-gray-300 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                {errors.email?.type==="required" && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="block text-gray-700 text-sm font-medium "
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject",{required:true})}
                  aria-invalid={errors.subject? "true":"false"}
                  name="subject"
                  placeholder="Enter Your Subject"
                  className="px-4 py-2 border border-gray-300 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                {errors.subject?.type==="required"
                  && (
                    <p className="text-red-500 text-sm mt-1">Subject is required</p>
                  )
                }
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-sm font-medium "
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  {...register("message",{required:true})}
                  aria-invalid={errors.message? "true":"false"}
                  rows="5"
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none shadow-sm"
                  placeholder="Type your message here..."
                ></textarea>
                {errors.message?.type==="required" &&
                 <p className="text-red-500 font-sm mt-1">Message field is required</p>
                }
              </div>
              <div>
                <input type="submit" className="bg-blue-600 px-4 py-2 font-semibold text-white rounded-lg hover:bg-blue-500 cursor-pointer transition" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
