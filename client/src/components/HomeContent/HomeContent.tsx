"use client";
import buyImage from "../../../public/Images/buy.png";
import sellImage from "../../../public/Images/selling.jpg";
import React, { useState } from "react";
import "./HomeContent.css";
import HomeSection from "../HomeSections/HomeSection";

function HomeContent() {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const [homeSectionContent] = useState({
    buy: {
      type: "buy",
      heading: "Browse & Buy Scrap Materials",
      description: `Buying scrap has never been easier. Our platform offers a user-friendly experience where buyers can browse through live listings posted by sellers. Listings are organized category-wise such as metal, plastic, paper, electronics, and more making it simple to find exactly what you're looking for. Each listing includes clear photos, seller location, weight, and expected price.
                    Buyers can view these listings in the store section, select their preferred category, and make direct offers based on what they see. Whether you're an individual or a merchant, you can negotiate prices in real time and finalize deals seamlessly. This system ensures transparency and empowers you to find the best deals that meet your needs and budget.`,
      image: buyImage,
    },
    sell: {
      type: "sell",
      heading: "Sell Your Scrap with Ease",
      description:
        "Our platform makes it simple for anyone to list and sell scrap items in just a few steps. To create a listing, all you need to do is fill out a quick form with essential details about your scrap material. Specify the category of scrap (such as metal, plastic, or paper), enter the weight in kilograms, and set your expected price. You can also add your location to help nearby buyers find your listing easily. Once submitted, your item will be visible to interested buyers who can directly negotiate with you through our real-time chat system. This process ensures transparency, fair pricing, and a hassle-free selling experience for everyone.",
      image: sellImage,
    },
  });

  // const data = useMemo(()=>{
  //   return homeSectionContent
  // },[homeSectionContent]);

  const handleExpantion = () => {
    if (isExpanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };
  return (
    <div>
      <div
        className="relative banner md:bg-cover bg-center h-[90vh]"
        style={{ backgroundImage: `url(/Images/banner.jpg)` }}
      >
        <div className="fade-div absolute bottom-0 w-full"></div>
      </div>
      <div className="p-10 content-container">
        <div className="aboutus-section">
          <h1 className="text-4xl font-bold mb-4">ABOUT US</h1>
          <p
            className={`text-lg text-justify reading-relaxed ${
              isExpanded ? "h-auto" : "overflow-hidden"
            }  h-[200px]`}
          >
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
          </p>
          <span onClick={handleExpantion}>
            <a className="cursor-pointer text-sm text-gray-500 md:hidden ">
              {isExpanded ? "read less" : "...read more"}
            </a>
          </span>
        </div>
        <HomeSection section={homeSectionContent.buy} />
        <HomeSection section={homeSectionContent.sell} />
      </div>
    </div>
  );
}

export default HomeContent;
