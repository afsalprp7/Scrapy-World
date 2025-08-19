"use client";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";

const WrapperAuth = (WrappedComponent: React.ComponentType) => {
  return function AuthProtected() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const verify = async () => {
        try {
          const response = await axios.get("/auth/userCheck");
          if (response.data?.valid) {
            setIsAuthenticated(true);
          }
        } catch {
          router.push("/login");
        } finally {
          setIsLoading(false);
        }
      };
      verify();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) return <Loader />;

    return isAuthenticated ? <WrappedComponent /> : <Loader />;
  };
};

export default WrapperAuth;
