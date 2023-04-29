import React from "react";
import { ReactNode } from "react";
import Header from "@/components/Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="container mx-32 h-10 leading-10">
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
