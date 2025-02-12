"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { otpData } from "@/tpes/auth";

function FormOtp() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<otpData>({
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
  });

  //adding values to the state
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    setOtp({
      ...otp,
      [name]: value,
    });

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  //handle bacspace of the otp form
  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.currentTarget;
    if (e.key === "Backspace" && !value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  //render input elements according to the state elements
  const renderOtpInput = () => {
    return Object.keys(otp).map((keys, index) => {
      return (
        <input
          key={index}
          name={keys}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          maxLength={1}
          className={`${
            index > 0 ? "ms-12" : ""
          } w-16 border-b-2 border-blue-800 text-center text-xl appearance-none focus:outline-none focus:border-green-800 bg-inherit`}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleBackspace(e, index)}
        />
      );
    });
  };
  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-center">
      <div className="text-white md:shadow-xl w-[800px] p-8">
        <div className="flex flex-col justify-center items-center mb-5">
          <Image
            src={"/favicon_io/android-chrome-512x512.png"}
            alt="scrapyWorld logo"
            width={100}
            height={100}
          />
          <h1 className="text-4xl">Enter The OTP</h1>
        </div>

        <div className="flex justify-center text-white mt-16">
          {renderOtpInput()}
        </div>

        <div className="flex flex-col justify-center items-center mt-16">
          <button
            className="bg-blue-900 rounded-md px-20 py-4 text-2xl hover:bg-green-900"
            type="submit"
          >
            Submit
          </button>
          <p className="text-[10px] mt-5 opacity-30">
            An otp has send to your registered email, Enter the otp to complete
            your registration.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FormOtp;
