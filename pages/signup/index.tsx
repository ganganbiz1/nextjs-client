import React from "react";
import Signup from "@/components/Signup";
import { useUser } from "hooks/useUser";
import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/router";

const SignupPage = () => {
  const isLoading = useAuth();
  const user = useUser();
  const router = useRouter();

  if (isLoading) {
    return <>Loading中ですよ</>;
  }

  if (user.accessToken) {
    router.push("/");
    return;
  }

  return <Signup />;
};

export default SignupPage;
