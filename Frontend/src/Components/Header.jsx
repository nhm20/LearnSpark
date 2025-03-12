import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import useAuth from "../Context/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const handleLoginClick = () => {
    if (user) {
      logOut();
    } else {
      navigate("/login"); 
    }
  };

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div>
        <div className="flex-1 mx-4">
          <SearchBar />
        </div>
        <nav className="flex space-x-6 items-center">
          <a href="#" className="hover:text-gray-300 transition">
            Courses
          </a>
          <button
            onClick={handleLoginClick}
            className="hover:text-gray-300 transition"
          >
            {user ? "Logout" : "Login"} 
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded">
            Dark Mode
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;