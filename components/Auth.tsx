import React from "react";
import { ReactNode } from "react";
import Login from "@/components/Login";
import { useRouter } from "next/router";
import Signup from "@/components/Signup";
import { useUser } from "hooks/useUser";
import { useAuth } from "hooks/useAuth";
import Layout from "@/components/Layout";
import { useDispatch } from "react-redux";

const Auth = ({ children }: { children: ReactNode }) => {
  const isLoading = useAuth();
  const user = useUser();
  const router = useRouter();
  const path = router.pathname;

  if (isLoading) {
    return <>Loading中ですよ</>;
  }

  return user.accessToken ? (
    <Layout>{children}</Layout>
  ) : path === "/signup" ? (
    <Signup />
  ) : (
    <Login />
  );
};

export default Auth;
