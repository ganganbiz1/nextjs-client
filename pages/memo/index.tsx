import React from "react";
import { useUser } from "@/hooks/useUser";

const MessagePage = () => {
  const user = useUser();
  console.log(user);
  return <div>Memoだよ</div>;
};

export default MessagePage;
