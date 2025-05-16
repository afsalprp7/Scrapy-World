import React, { useState } from "react";
import Image from "next/image";
import { homeSectionContent } from "@/tpes/home";
function HomeSection({ section }: { section: homeSectionContent }) {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <div className="Buy h-auto w-full mt-10 md:mt-0 drop-shadow-xl ">
      <h1 className="md:text-4xl text-2xl font-bold">{section.heading}</h1>
      <div
        className={`flex flex-col items-center ${
          section.type !== "buy" ? "md:flex-row-reverse" : "md:flex-row"
        } justify-between`}
      >
        <p
          className={`text-lg text-justify reading-relaxed md:w-[900px] mt-4 ${
            expanded ? "h-fit" : "h-[25vh] overflow-hidden"
          }  md:h-auto md:overflow-auto`}
        >
          {section.description}
        </p>
        <span
          className="text-left mb-3 mt-5 text-gray-500 cursor-pointer md:hidden"
          onClick={() => setExpanded((prev) => (prev ? false : true))}
        >
          {expanded ? "less" : "more..."}
        </span>
        <div>
          <Image src={section.image} alt="buy-pic" />
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
