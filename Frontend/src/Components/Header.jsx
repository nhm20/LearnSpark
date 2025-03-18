import React from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import useAuth from "../Context/useAuth";
import Logo from "./Logo";
const Header = ({ onSearch, resetSearchQuery, cartItemCount }) => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const handleLoginClick = async () => {
    if (user) {
      try {
        await logOut();
        navigate("/");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    } else {
      navigate("/login");
    }
  };

  const handleCoursesClick = () => {
    if (resetSearchQuery) {
      resetSearchQuery(); // Ensure resetSearchQuery is a function
    }
    navigate("/courses");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <header className="text-white px-4 py-3 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <div className="w-full md:flex-1 md:mx-8 max-w-2xl">
          <SearchBar onSearch={onSearch} />
        </div>
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
          <button
            onClick={handleCoursesClick}
            className="px-4 py-2 text-lg font-medium text-gray-300 hover:text-white hover:bg-indigo-600 rounded-lg transition duration-300"
          >
            Courses
          </button>
          {user && (
            <Link
              to="/profile"
              className="px-4 py-2 text-lg font-medium text-gray-300 hover:text-white hover:bg-blue-600 rounded-lg transition duration-300"
            >
              {user.displayName || "Profile"}
            </Link>
          )}
          <button
            onClick={handleCartClick}
            className="px-4 py-2 text-lg font-medium text-gray-300 hover:text-white hover:bg-green-600 rounded-lg transition duration-300"
          >
            Cart {cartItemCount > 0 && `(${cartItemCount})`}
          </button>
          <button
            onClick={handleLoginClick}
            className="px-6 py-2 text-lg font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition duration-300"
            aria-label={user ? "Logout" : "Login"}
          >
            {user ? "Logout" : "Login"}
          </button>
        </nav>
      </div>
    </header>
  );
};


export default Header;
