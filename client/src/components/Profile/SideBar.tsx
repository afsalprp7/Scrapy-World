"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import userProfileIcon from "../../../public/Images/userProfile.jpg";
import { useState } from "react";

const Sidebar = () => {
  const [selectedIndex,setSelectedIndex] = useState<number>(0)
  const sections: string[] = [
    "Profile",
    "Offers",
    "Uploads",
    "Billing Details",
  ];
  return (
    <motion.div
      className="w-64 h-screen bg-white shadow-md p-4"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Image
          src={userProfileIcon}
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-lg font-semibold">User Profile</span>
      </div>
      <ul className="space-y-2">
        {sections &&
          sections.map((item, index) => (
            <div key={index}>
              <li
                onClick={()=>setSelectedIndex(index)}
                className={`${selectedIndex === index ? 'bg-green-500' : ''} hover:bg-gray-100 rounded-md p-2 font-semibold`}
              >
                {item}
              </li>
            </div>
          ))}

       
      </ul>
    </motion.div>
  );
};

export default Sidebar;
