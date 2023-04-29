import React from "react";
import { useUser } from "@/hooks/useUser";

const MessagePage = () => {
  const user = useUser();
  console.log(user);
  return <div>Messageだよ</div>;
};

export default MessagePage;
