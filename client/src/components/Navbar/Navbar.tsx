"use client";

import React from "react";
import logo_icon from "../../../public/favicon_io/android-chrome-192x192.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SheetSide } from "../utils/SheetSide";

import { useAppSelector } from "@/redux/typedHooks";
import { userDetails } from "@/tpes/home";
import DropdownComponent from "../utils/DropdownComponent";

function Navbar() {
  const router = useRouter();

  const {
    user,
    userLoggedIn,
  }: { user: null | userDetails; userLoggedIn: boolean } = useAppSelector(
    (state) => state.user
  );

  const authHandler = () => {
    router.push("/login");
  };

  const headingContent = () => {
    return (
      <div className="flex flex-col gap-5">
        <a
          href="#"
          className="text-gray-700 hover:text-blue-500 text-base font-medium"
        >
          Home
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-blue-500 text-base font-medium"
        >
          About
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-blue-500 text-base font-medium"
        >
          Services
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-blue-500 text-base font-medium"
        >
          Contact
        </a>
      </div>
    );
  };

  return (
    <nav className="bg-white w-full shadow-md drop-shadow-xl sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Title */}
          <div className="flex items-center">
            <div className="md:hidden cursor-pointer">
              <SheetSide userLoggedIn={userLoggedIn} heading={"SCRAPY WORLD"} content={headingContent} />
            </div>
            <Image
              className="w-[70px] h-[70px] hidden md:block"
              src={logo_icon}
              alt="Logo"
            />
            <h1 className="text-green-950 font-bold text-md md:text-2xl ">
              SCRAPY WORLD
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-7">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500 text-base font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500 text-base font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500 text-base font-medium"
            >
              Services
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500 text-base font-medium"
            >
              Contact
            </a>
          </div>

          {/* Login Button */}
          <div className={`${userLoggedIn ? "hidden" : "flex"} items-center`}>
            <button
              onClick={authHandler}
              className="bg-green-800 text-white px-3 py-2 md:px-5 md:py-2 rounded-md hover:bg-gray-700 text-sm md:text-base font-semibold"
            >
              Login
            </button>
          </div>
          {/* Username when loggedin */}
          <div className={`${userLoggedIn ? 'flex items-center space-x-5' : 'hidden'}`}>
            <div className="hidden md:block">
              <button className="bg-gradient-to-r from-green-500 to-black text-white font-semibold py-2 px-4 rounded-lg hover:from-green-600 hover:to-gray-900 transition-all duration-300  p-2">BUY / SELL</button>
            </div>
            <DropdownComponent image ={logo_icon} userLoggedIn={userLoggedIn} userDetails={user}/>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
