"use client";
import SignupForm from "@/components/SignupForm/SignupForm";
import { useAppSelector } from "@/redux/typedHooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Signup() {
  const router = useRouter();
  const { userLoggedIn } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userLoggedIn) {
      router.push("/");
    }
  });
  return <SignupForm />;
}
