import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import useAuth from "../Context/useAuth";
import Logo from "./Logo";
import { Menu, X, ShoppingCart } from "lucide-react";

const Header = ({ onSearch, resetSearchQuery, cartItemCount }) => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
  };

  const handleCoursesClick = () => {
    if (resetSearchQuery) {
      resetSearchQuery();
    }
    navigate("/courses");
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    navigate("/orders");
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-black text-white px-4 py-3 shadow-lg sticky top-0 z-50 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full flex justify-between items-center md:w-auto">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Search bar - moves to top on mobile when menu is open */}
        <div className={`w-full md:flex-1 md:mx-8 max-w-2xl ${isMobileMenuOpen ? 'order-first mt-4' : ''}`}>
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-4 lg:gap-6 items-center">
          {user && (
            <Link
              to="/profile"
              className="px-4 py-2 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition duration-300 whitespace-nowrap"
            >
              {user.displayName || "Profile"}
            </Link>
          )}
          <button
            onClick={handleCartClick}
            className="px-4 py-2 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition duration-300 flex items-center gap-1 whitespace-nowrap relative"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          <button
            onClick={handleLoginClick}
            className="px-6 py-2 text-lg font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition duration-300 whitespace-nowrap"
            aria-label={user ? "Logout" : "Login"}
          >
            {user ? "Logout" : "Login"}
          </button>
        </nav>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden w-full bg-gray-900 rounded-lg mt-2 p-4 border border-gray-800">
            <nav className="flex flex-col gap-3">
              {user && (
                <button
                  onClick={handleProfileClick}
                  className="px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition duration-300 text-left flex items-center gap-3"
                >
                  {user.displayName || "Profile"}
                </button>
              )}
              <button
                onClick={handleCartClick}
                className="px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition duration-300 flex items-center gap-3 text-left relative"
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                onClick={handleLoginClick}
                className="px-6 py-3 text-lg font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition duration-300 text-center"
              >
                {user ? "Logout" : "Login"}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;