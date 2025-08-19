"use client";
import FormOtp from "@/components/Otpform/FormOtp";
import { useAppSelector } from "@/redux/typedHooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function OtpForm() {
  const router = useRouter();
  const { userLoggedIn } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userLoggedIn) {
      router.push("/");
    }
  }, [userLoggedIn, router]);
  return !userLoggedIn && <FormOtp />;
}
