import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <header className="bg-red-800 text-white font-semibold text-sm flex items-center justify-center py-3 gap-3 px-5">
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <button
        type="button"
        className="bg-white rounded-md p-1 text-xs text-black ml-auto"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
