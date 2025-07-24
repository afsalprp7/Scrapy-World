"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Sidebar from "./SideBar";
import { FaPen } from "react-icons/fa";
import { useAppSelector } from "@/redux/typedHooks";
import { userDetails } from "@/tpes/home";

const Profile = () => {
  const { user }:{user : null | userDetails} = useAppSelector((state)=> state.user)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Upload logic here
      console.log("Uploading:", file);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <motion.div
        className="flex-1 pt-8 justify-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-xl shadow-md p-8 max-w-6xl mx-auto">
          <div className="relative w-full flex flex-col items-center">
            <div className="relative">
                <button
                onClick={handleImageClick}
                className="absolute bottom-0 right-0 bg-gray-200 text-white p-1 rounded-full shadow hover:bg-green-800 transition"
              >
                <FaPen className="text-green-800"/>
              </button>
              <Image
                src=""
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
              />
              
              <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            </div>
            <h2 className="mt-4 font-semibold text-lg">{user?.firstname} {user?.lastname}</h2>
            
          </div>

          <div className="mt-6 space-y-2">
            <p>
              <strong>First Name:</strong> { user?.firstname }
            </p>
            <p>
              <strong>Last Name:</strong> {user?.lastname}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Phone:</strong> {user?.phone}
            </p>
          </div>

          <div className="mt-6 flex justify-end space-x-6">
            <button className="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-all">
              Edit Details
            </button>
            <button className="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-all">
              Add Shop
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
