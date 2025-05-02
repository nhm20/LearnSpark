import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import useAuth from "../Context/useAuth";
import Logo from "./Logo";
import { Menu, X, ShoppingCart, User } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);

  const handleLoginClick = async () => {
    if (user) {
      try {
        await logOut();
        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      navigate("/login");
    }
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    setIsCartAnimating(true);
    setTimeout(() => {
      setIsCartAnimating(false);
      navigate("/orders");
    }, 500);
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-black text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Menu Toggle */}
        <div className="w-full flex justify-between items-center md:w-auto">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Search Bar */}
        <div
          className={`w-full md:flex-1 md:mx-8 max-w-2xl transition-all ${
            isMobileMenuOpen ? "order-first mt-4" : ""
          }`}
        >
          <SearchBar />
        </div>

        {/* Desktop Actions */}
        <nav className="hidden md:flex items-center gap-4">
          {user && (
            <button
              onClick={handleProfileClick}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition px-4 py-2 rounded-lg"
              aria-label="Profile"
            >
              <User size={20} />
            </button>
          )}
          <button
            onClick={handleCartClick}
            className="relative flex items-center text-gray-300 hover:text-blue-400 transition px-4 py-2 rounded-lg"
            aria-label="Cart"
          >
            <ShoppingCart
              size={20}
              className={`transition-all duration-500 ${
                isCartAnimating
                  ? "animate-[bounce_0.5s_ease-in-out_2] text-blue-400 scale-110"
                  : "text-blue-300"
              }`}
            />
          </button>
          <button
            onClick={handleLoginClick}
            className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-lg font-medium transition"
          >
            {user ? "Logout" : "Login"}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden w-full bg-black border border-gray-800 rounded-lg mt-2 p-4">
            <nav className="flex flex-col items-center gap-3">
              {user && (
                <button
                  onClick={handleProfileClick}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-lg text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition"
                >
                  <User size={20} />
                  <span>Profile</span>
                </button>
              )}
              <button
                onClick={handleCartClick}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-lg text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition"
              >
                <ShoppingCart
                  size={20}
                  className={`transition duration-300 ${
                    isCartAnimating
                      ? "animate-bounce text-blue-400"
                      : "text-blue-300"
                  }`}
                />
                <span>Cart</span>
              </button>
              <button
                onClick={handleLoginClick}
                className="w-full px-6 py-3 text-lg text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition"
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
