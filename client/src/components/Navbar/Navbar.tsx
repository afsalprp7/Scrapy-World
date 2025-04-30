"use client";

import React from 'react';
import logo_icon from '../../../public/favicon_io/android-chrome-192x192.png';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Navbar() {
  const router = useRouter();

  const authHandler = () => {
    router.push('/login');
  };

  return (
    <nav className="bg-white w-full shadow-md drop-shadow-xl sticky top-0 z-50">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <Image className="w-[50px] h-[50px]" src={logo_icon} alt="Logo" />
            <h1 className="text-green-950 font-bold text-2xl">SCRAPY WORLD</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-500 text-base font-medium">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-500 text-base font-medium">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-500 text-base font-medium">
              Services
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-500 text-base font-medium">
              Contact
            </a>
          </div>

          {/* Login Button */}
          <div className="flex items-center">
            <button
              onClick={authHandler}
              className="bg-green-800 text-white px-5 py-2 rounded-md hover:bg-gray-700 text-base font-semibold"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
