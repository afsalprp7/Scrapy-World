import React from "react";
import "./HomeContent.css"


function HomeContent() {
  return (
    <div>
      <div className="relative banner md:bg-cover bg-center h-[85vh]" style={{backgroundImage : `url(/Images/banner.jpg)`}}></div>
      <div className="p-10 content-container">
        <div className="aboutus-section md:w-[120vh]">
        <h1 className="text-4xl font-bold">ABOUT US</h1>
        <p className="font-sm">This is a web application for <span className="font-black">selling and buying</span> scrap items. Simply You sell and also buy the scarp items according to the price and bargaining 
        </p>
        </div>

      </div>
    </div>
  )
}

export default HomeContent
