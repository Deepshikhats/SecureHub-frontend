import React from "react";
import { Header } from "../components";

const CommonLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Header />
      <div className="bg-slate-100 h-full">{children}</div>
    </>
  );
};

export default CommonLayout;
