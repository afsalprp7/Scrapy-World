import React from "react";
import Image from "next/image";
import logo_icon from "../../../public/favicon_io/android-chrome-192x192.png";
import { FaPhone, FaEnvelope, FaTag } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  return (
    <div className="bg-black bottom-0 z-20 w-full p-12 text-white">
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        {/* Logo and description */}
        <div className="items-start gap-4 hidden md:flex">
          <Image className="w-[70px] h-[70px]" src={logo_icon} alt="logo" />
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-semibold">SCRAPY WORLD</h1>
            <p className="w-[220px] text-sm text-justify leading-relaxed">
              Connect with local buyers and sellers, negotiate prices in real
              time, and trade scrap materials with ease and transparency.
            </p>
          </div>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-semibold">CONTACT US</h1>
          <div className="flex items-center gap-2">
            <FaPhone />
            <span>+91 95262 25006</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope />
            <span>muhammedafsal078@gmail.com</span>
          </div>
        </div>
        <hr className="md:hidden" />
        {/* services section */}
        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-semibold">SERVICES</h1>
          <Link href="">
            <div className="flex items-center gap-2">
              <FaTag />
              <span>Buy and sell</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Footer;
