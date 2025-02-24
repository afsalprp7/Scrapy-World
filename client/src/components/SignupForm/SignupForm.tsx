"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormData } from "@/tpes/auth";
import Link from "next/link";
import Image from "next/image";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";


function SignupForm() {
  //loader
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...rest } = data;
      const response = await axios.post("send-otp", rest);
      localStorage.setItem("userResponse",JSON.stringify(response.data));
      router.push("/otp");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message || "An error occurred");
        router.push("/login");
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <motion.div animate={{ opacity: 1, x: 0 }}
    initial={{ opacity: 0, x: 50 }}
    transition={{ duration: 0.5, ease: "easeIn" }}

      className={`parentContainer bg-cover bg-center min-h-screen relative`}
      style={{ backgroundImage: `url("/Images/bg-auth.avif")` }}
    >
      {loading && (
        <div className="fixed z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-center">
            <ClipLoader size={50} color="#00000" />
            <p className="text-black mt-2">Processing...</p>
          </div>
        </div>
      )}
      <div
        className={`hidden md:flex items-center ${loading ? "blur-sm" : ""}`}
      >
        <Image
          src={"/favicon_io/android-chrome-192x192.png"}
          alt="ScrapyWorld logo"
          width={90}
          height={90}
        />
        <h1 className="text-xl font-bold text-green-900">SCRAPY WORLD</h1>
      </div>
      <div
        className={`flex items-center justify-center min-h-screen md:min-h-0 ${
          loading ? "blur-sm pointer-events-none" : ""
        } `}
      >
        <div className="flex flex-col w-full justify-center md:flex-row md:w-[800px] p-6 md:shadow-lg">
          {/*left section */}
          <div className="flex items-center justify-center md:w-[500px]">
            <Image
              src={"/favicon_io/android-chrome-192x192.png"}
              width={120}
              height={120}
              alt="logo_image"
            />
          </div>
          {/* end of left section */}
          {/* right section */}
          <div className="w-full">
            <div className="mb-4">
              <h1 className="text-3xl font-bold flex justify-center">
                Create an Account
              </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="firstName">Firstname</label>
              <input
                defaultValue=""
                {...register("firstname", {
                  required: "This field cannot be empty",
                  minLength: {
                    value: 3,
                    message: "First name must be atleast 4 characters",
                  },
                  validate: (value) => (Number(value) ? "Invalid Entry" : true),
                })}
                placeholder="Enter Your Firstname"
                type="text"
                className=" shadow text-sm w-full px-4 py-1  rounded-lg outline-none border focus:border-green-700"
              />
              {errors && (
                <p className="text-sm text-red-500">
                  {errors.firstname?.message}
                </p>
              )}

              <label htmlFor="lastName">Lastname</label>
              <input
                defaultValue=""
                {...register("lastname", {
                  required: "This field cannot be empty",
                  minLength: {
                    value: 2,
                    message: "Second name must be atleast 2 characters",
                  },
                  validate: (value) => (Number(value) ? "Invalid Entry" : true),
                })}
                placeholder="Enter Your Lastname"
                type="text"
                className=" shadow text-sm w-full px-4 py-1  rounded-lg outline-none border focus:border-green-700"
              />
              {errors && (
                <p className="text-sm text-red-500">
                  {errors.lastname?.message}
                </p>
              )}
              <label htmlFor="email">Email</label>
              <input
                defaultValue=""
                {...register("email", {
                  required: "this field cannot be empty",
                  validate: (value) =>
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                      ? "Invalid Email"
                      : true,
                })}
                placeholder="Enter Your Email"
                className=" shadow text-sm w-full px-4 py-1 rounded-lg outline-none border focus:border-green-700"
              />
              {errors && (
                <p className="text-sm text-red-500">{errors.email?.message}</p>
              )}

              <label htmlFor="phone">Phone</label>
              <input
                defaultValue=""
                {...register("phone", {
                  required: "This field cannot be empty",

                  validate: (value) =>
                    !/^\d{10}$/.test(value) ? "Enter Valid Phone Number" : true,
                })}
                placeholder="Enter Your Phone Number"
                className=" shadow text-sm w-full px-4 py-1 rounded-lg outline-none border focus:border-green-700"
              />
              {errors && (
                <p className="text-sm text-red-500">{errors.phone?.message}</p>
              )}
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  defaultValue=""
                  placeholder="Enter Your Password"
                  {...register("password", {
                    required: "This field cannot be empty",
                    validate: (value) => {
                      if (!/^(?=.*?[A-Z])/.test(value)) {
                        return "Password need atleast one uppercase";
                      } else if (!/^(?=.*?[a-z])/.test(value)) {
                        return "Password need atleast one lowercase";
                      } else if (!/^(?=.*?[0-9])/.test(value)) {
                        return "Password need atleast one digit";
                      } else if (!/^(?=.*?[#?!@$%^&*-])/.test(value)) {
                        return "Password need atleast one special character";
                      } else {
                        return true;
                      }
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className=" shadow text-sm w-full px-4 py-1  rounded-lg outline-none border focus:border-green-700"
                />
                <i
                  onClick={togglePassword}
                  className={`pointer fa-solid ${
                    showPassword ? "fa-eye" : "fa-eye-slash"
                  } cursor-pointer absolute right-0 mt-2 me-3`}
                ></i>
              </div>
              {errors && (
                <p className="text-sm text-red-500">
                  {errors.password?.message}
                </p>
              )}
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                defaultValue=""
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Password doesn't match",
                  validate: (value) =>
                    value === getValues("password")
                      ? true
                      : "Password doesn't match",
                })}
                type={showPassword ? "text" : "password"}
                className="shadow text-sm w-full px-4 py-1  rounded-lg outline-none border focus:border-green-700"
              />
              {errors && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              )}
              <p className="text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-green-800 hover:underline">
                  Login
                </Link>
              </p>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-12 bg-black text-white font-bold rounded-xl py-2  mt-2"
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
          {/* right section end */}
        </div>
      </div>
    </motion.div>
  );
}

export default SignupForm;
