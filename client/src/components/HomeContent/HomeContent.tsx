"use client";

import React, { useState } from "react";
import "./HomeContent.css";

function HomeContent() {
  const [isExpanded,setExpanded] = useState<boolean>(false);
  const handleExpantion = ()=>{
    if(isExpanded){
      setExpanded(false)
    }else{
      setExpanded(true)
    }
  }
  return (
    <div>
      <div
        className="relative banner md:bg-cover bg-center h-[85vh]"
        style={{ backgroundImage: `url(/Images/banner.jpg)`}}
      ></div>
      <div className="p-10 content-container">
        <div className="aboutus-section">
          <h1 className="text-4xl font-bold mb-4">ABOUT US</h1>
          <p className={`text-lg text-justify reading-relaxed ${isExpanded ? 'h-auto' : 'overflow-hidden' }  h-[200px]`}>
            This web application is a dedicated platform for buying and selling
            scrap items, allowing users to trade efficiently with real-time
            bargaining. Sellers can list their scrap materials with their
            desired prices, while buyers can browse available listings and
            negotiate prices directly through the platform. The system
            facilitates secure transactions by generating bills based on
            accepted offers. Additionally, scrap merchants can showcase their
            shops, set category-wise prices, and provide location-based services
            to attract buyers. With a seamless user experience, this application
            optimizes the scrap trading process, making it more accessible,
            transparent, and convenient for all users.
          </p><span onClick={handleExpantion}><a className="cursor-pointer text-sm text-gray-500 md:hidden ">{isExpanded ? 'read less': '...read more' }</a></span>
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
