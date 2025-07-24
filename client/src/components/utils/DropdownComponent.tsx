import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import axiosInstance from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userDetails } from "@/tpes/home";
import { useAppDispatch } from "@/redux/typedHooks";
import axios from "../../utils/axios";
import { removeUser } from "@/redux/user";
import { useRouter } from "next/navigation";
function DropdownComponent({
  image,
  userLoggedIn,
  userDetails,
}: {
  image: StaticImageData;
  userLoggedIn: boolean;
  userDetails: userDetails | null;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      const response = await axios.get("/auth/logout");
      if (response.status === 200) {
        dispatch(removeUser());
        router.push('/')
      }
    } catch (error: unknown) {
      if (axiosInstance.isAxiosError(error)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data?.message || "Something went wrong",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Server Error",
        });
      }
    }
  };
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
          <Link href="#" onClick={handleLogout}>
            Log Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownComponent;
