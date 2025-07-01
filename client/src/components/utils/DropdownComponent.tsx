import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userDetails } from "@/tpes/home";
function DropdownComponent({
  image,
  userLoggedIn,
  userDetails,
}: {
  image: StaticImageData;
  userLoggedIn: boolean;
  userDetails: userDetails | null;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className={`${
            userLoggedIn ? "flex" : "hidden"
          } justify-center items-center space-x-1`}
        >
          <div className="w-[40px] md:w-auto overflow-hidden">
            <p className="text-md">
              {userDetails?.firstname}
              {userDetails?.lastname}
            </p>
          </div>
          <div>
            <Image width={50} src={image} alt="profilepic" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href='#'>Log Out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownComponent;
