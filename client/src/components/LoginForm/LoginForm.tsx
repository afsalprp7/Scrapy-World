"use client";
import React, { useState } from "react";
import login_Icon from "../../../public/favicon_io/android-chrome-192x192.png";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginData } from "@/tpes/auth";
import { motion } from "framer-motion";
import axios from "@/utils/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { addUser } from "@/redux/user";
import { useAppDispatch } from "@/redux/typedHooks";
function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>();

  const [validationError, setError] = useState("");

  const validEmail: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordUppercase: RegExp = /^(?=.*?[A-Z])/;
  const passwordLower: RegExp = /^(?=.*?[a-z])/;
  const passwordDigit: RegExp = /^(?=.*?[0-9])/;
  const passwordSpecial: RegExp = /^(?=.*?[#?!@$%^&*-])/;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<loginData> = async (data) => {
    try {
      const response = await axios.post("/auth/login", data);
      dispatch(addUser(response.data.user));
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Invalid Password");
      }
    }
  };
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url('/Images/bg-auth.avif')` }}
    >
      <div className="hidden md:flex items-center">
        <Image src={login_Icon} alt="ScrapyWorld logo" width={90} />
        <h1 className="text-xl font-bold text-green-900">SCRAPY WORLD</h1>
      </div>
      <div className="main-container flex min-h-screen md:min-h-0 justify-center items-center md:mt-9">
        <div className="flex flex-col md:flex-row justify-center items-center md:shadow-xl p-6 sm:p-10 w-full max-w-[700px]">
          {/* Left Column */}
          <div className="flex flex-col justify-center mb-5  md:mb-0 md:mr-5">
            <Image
              className="block"
              src={login_Icon}
              alt="ScrapyWorld logo"
              width={130}
            />
            <h1 className="text-xl md:hidden font-bold text-green-800">
              Scrapy World
            </h1>
          </div>

          {/* Right Column */}
          <div className="right-column w-full md:w-[400px] p-5">
            {/* Login Heading */}
            <div className="flex justify-center items-center mb-5">
              <h1 className="font-bold text-2xl md:text-4xl text-black">
                Login
              </h1>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} action="">
              {validationError && (
                <h1 className="text-center text-red-600">{validationError}</h1>
              )}
              {/* Email Input */}
              <label className="block text-sm md:text-base" htmlFor="email">
                Email
              </label>
              <input
                className="shadow block w-full px-4 py-2 border border-gray-300 rounded-md focus:border-green-500 outline-none text-sm md:text-base"
                type="email"
                placeholder="Enter the registered email"
                {...register("email", {
                  required: "This field cannot be empty",
                  validate: (value) =>
                    !validEmail.test(value) ? "Invalid email" : true,
                })}
              />
              {errors && (
                <p className="text-sm text-red-500">{errors.email?.message}</p>
              )}
              {/* Password Input */}
              <label
                className="block mt-1 text-sm md:text-base"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  defaultValue=""
                  className="shadow block w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-green-500 text-sm md:text-base"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "This field cannot be empty",
                    validate: (value) => {
                      if (!passwordUppercase.test(value)) {
                        return "Password need atleast one uppercase";
                      } else if (!passwordLower.test(value)) {
                        return "Password need atleast one lowercase";
                      } else if (!passwordDigit.test(value)) {
                        return "Password need atleast one digit";
                      } else if (!passwordSpecial.test(value)) {
                        return "Password need atleast one special character";
                      } else {
                        return true;
                      }
                    },
                  })}
                />
                <i
                  onClick={togglePassword}
                  className={`pointer fa-solid ${
                    showPassword ? "fa-eye" : "fa-eye-slash"
                  } cursor-pointer absolute right-0 bottom-3 me-3`}
                ></i>
              </div>
              {errors && (
                <p className="text-sm text-red-500">
                  {errors.password?.message}
                </p>
              )}
              {/* Signup Link */}
              <p className="text-sm mt-1">
                Dont have an account?{" "}
                <span>
                  <Link
                    href="/signup"
                    className="text-green-700 hover:underline"
                  >
                    Signup
                  </Link>
                </span>
              </p>

              {/* Login Button */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="text-white bg-black px-8 sm:px-12 py-2 rounded-xl"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LoginForm;
