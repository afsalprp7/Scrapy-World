import Footer from "@/components/footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Profile from "@/components/Profile/Profile";
import React from "react";

function page() {
  return (
    <div>
      <Navbar />
      <Profile />
      <Footer/>
    </div>
  );
}

export default page;
