import React from "react";
import Login from "@/components/Login";
import { useUser } from "hooks/useUser";
import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/router";

const LoginPage = () => {
  const isLoading = useAuth();
  const user = useUser();
  const router = useRouter();

  if (isLoading) {
    return <>Loading中ですよ</>;
  }

  if (user.accessToken) {
    console.log(user);
    router.push("/");
    return;
  }

  return <Login />;
};

export default LoginPage;
