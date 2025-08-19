"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Profile from "@/components/Profile/Profile";
import WrapperAuth from "@/components/wrapper/WrapperAuth";
import React from "react";
function page() {
  return (
    <div>
      <Navbar />
      <Profile />
      <Footer />
    </div>
  );
}

export default WrapperAuth(page);
