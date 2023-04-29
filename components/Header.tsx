import React, { useState } from "react";
import { firebaseConfig } from "@/config/firebase";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleLogout = async () => {
    setIsLoading(true);
    const auth = getAuth(initializeApp(firebaseConfig));
    signOut(auth)
      .then(() => {
        console.log("ログアウトに成功しました");
      })
      .catch((error) => {
        console.log(error);
        setErrMessage("ログインに失敗しました。");
      })
      .finally(() => {
        setIsLoading(false);
      });

    router.push("/login");
    return;
  };

  const menus = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Message", link: "/message" },
    { id: 3, name: "Memo", link: "/memo" },
  ];

  return (
    <>
      <div className="bg-gray-300">
        <header className="container mx-auto text-white">
          <div className="flex justify-between items-cente">
            <h1 className="text-4xl font-semibold">HR</h1>
          </div>
          <div>
            <ul className="md:flex md:justify-center">
              {menus.map((menu) => {
                return (
                  <li key={menu.id}>
                    <Link
                      href={menu.link}
                      className="block px-10 py-2 my-4 hover:bg-orange-400 rounded-full"
                    >
                      {menu.name}
                    </Link>
                  </li>
                );
              })}
              <li
                className="block px-10 py-2 my-4 cursor-pointer hover:bg-orange-400 rounded-full"
                onClick={handleLogout}
              >
                ログアウト
              </li>
            </ul>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
