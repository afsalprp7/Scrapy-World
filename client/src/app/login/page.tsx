"use client";
import LoginForm from "@/components/LoginForm/LoginForm";
import { useAppSelector } from "@/redux/typedHooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { userLoggedIn } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (userLoggedIn) {
      router.push("/");
    }
  });
  return <LoginForm />;
}
