"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { otpData } from "@/tpes/auth";
import axios from "@/utils/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/typedHooks";
import { addUser } from "@/redux/user";
function FormOtp() {
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [formError, setFormError] = useState<string>("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inputRefs.current) {
      (inputRefs.current[0] as HTMLInputElement).focus();
    }
  }, []);

  const [otp, setOtp] = useState<otpData>({
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
  });

  //adding values to the state.
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const numberReg: RegExp = /^\d*$/;

    setOtp({
      ...otp,
      [name]: value,
    });

    if (value && index < 3 && numberReg.test(value)) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  //handle bacspace of the otp form.
  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.currentTarget;
    if (e.key === "Backspace" && !value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  //render input elements according to the state elements.
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
            index > 0 ? "md:ms-12" : ""
          } w-10 md:w-16 border-b-2 border-blue-800 ms-9 text-center text-xl focus:outline-none focus:border-green-800 bg-inherit`}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleBackspace(e, index)}
        />
      );
    });
  };

  const SubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (Object.values(otp).some((value) => value === "")) {
      setFormError("OTP Incomplete");
    } else {
      setFormError("");
      const submit = async () => {
        try {
          const userOtp = Object.values(otp);
          const formattedUserOtp = userOtp.join("");
          const sendingData = JSON.parse(
            localStorage.getItem("userResponse") || ""
          );
          const response = await axios.post("create-user", {
            formattedUserOtp,
            sendingData,
          });
          const user = response.data.user;
          dispatch(addUser(user));
          router.push("/");
        } catch (error) {
          if (error instanceof AxiosError) {
            setFormError(error?.response?.data?.message);
          }
        }
      };
      await submit();
    }
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
            inputMode="numeric"
          />
          <h1 className="text-4xl">Enter The OTP</h1>
        </div>

        <div className="flex justify-center text-white mt-16">
          <form onSubmit={(event) => SubmitHandler(event)}>
            {renderOtpInput()}
            <p className="text-center md:text-right text-[12px] mt-5 md:mt-3 cursor-pointer block">
              Resend OTP
            </p>
            <p className="text-center text-sm text-red-700 mt-4">{formError}</p>
            <div className="flex flex-col justify-center items-center mt-16">
              <button
                className="bg-blue-900 rounded-md px-20 py-4 text-2xl hover:bg-green-900"
                type="submit"
              >
                Submit
              </button>
              <p className="text-[10px] mt-5 opacity-30 text-center">
                An otp has send to your registered email, Enter the otp to
                complete your registration.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormOtp;
