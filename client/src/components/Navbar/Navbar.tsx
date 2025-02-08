"use client";

import React from 'react';
import logo_icon from '../../../public/favicon_io/android-chrome-192x192.png' ;
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Navbar() {
    const router = useRouter() ;
    const authHandler = () =>{
        router.push('/login');
     }
   return (
     <nav className="bg-white shadow-md">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-center h-20">
           {/* Logo */}
           <div className="flex-shrink-0">
             <Image className="w-[70px]" src={logo_icon} alt="Logo" />
           </div>
           {/* Navigation Links */}
           <div className="hidden md:flex space-x-8">
             <a href="#" className="text-gray-700 hover:text-blue-500 text-sm font-medium">
               Home
             </a>
             <a href="#" className="text-gray-700 hover:text-blue-500 text-sm font-medium">
               About
             </a>
             <a href="#" className="text-gray-700 hover:text-blue-500 text-sm font-medium">
               Services
             </a>
             <a href="#" className="text-gray-700 hover:text-blue-500 text-sm font-medium">
               Contact
             </a>
           </div>
           {/* Login/Signup Button */}
           <div className="flex items-center">
             <button onClick={authHandler} className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-gray-600 text-sm font-semibold">
               Login / Sign Up
             </button>
           </div>
         </div>
       </div>
     </nav>
   );
  
}

export default Navbar
