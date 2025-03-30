import React, { useState, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDebounce } from "use-debounce";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Close recommendations when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setRecommendations([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch recommendations when debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setRecommendations([]);
      return;
    }
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/units/search/results`,
          {
            params: { query: debouncedQuery },
          }
        );
        const results = response.data.units.map((unit) => unit.name) || [];
        setRecommendations(results.slice(0, 4));
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("Failed to fetch recommendations. Please try again.");
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [debouncedQuery]);

  const handleSearch = () => {
    if (query.trim() === "") return;

    if (typeof onSearch === "function") {
      onSearch(query);
    }
    navigate(`/courses?query=${encodeURIComponent(query)}`);
    setRecommendations([]);
  };

  const handleSelectRecommendation = (item) => {
    setQuery(item);
    setRecommendations([]);
    navigate(`/courses?query=${encodeURIComponent(item)}`);
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={searchRef}>
      <div className="relative flex items-center">
        {/* Search Input with white border */}
        <input
          type="text"
          placeholder="Search courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-4 py-2 pr-10 bg-black text-white border-1 border-gray-500 rounded-full 
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 
                    transition-all duration-200 placeholder-gray-200"
          aria-label="Search courses"
          aria-haspopup="listbox"
          aria-expanded={recommendations.length > 0}
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="absolute right-3 text-gray-300 hover:text-blue-400 transition-colors duration-200"
          aria-label="Search"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Recommendations Dropdown */}
      {(loading || error || recommendations.length > 0) && isFocused && (
        <div className="absolute mt-2 w-full bg-black border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden">
          {/* Loading State */}
          {loading && (
            <div className="px-4 py-3 text-gray-300 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Searching...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="px-4 py-3 text-red-400 bg-red-900/20">
              {error}
            </div>
          )}

          {/* Recommendations */}
          {!loading && recommendations.length > 0 && (
            <ul
              className="py-1"
              role="listbox"
              aria-label="Search recommendations"
            >
              {recommendations.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2.5 text-gray-200 hover:bg-gray-800/80 cursor-pointer 
                            transition-colors duration-150 border-t border-gray-700 first:border-t-0"
                  onClick={() => handleSelectRecommendation(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSelectRecommendation(item);
                    }
                  }}
                  tabIndex={0}
                  role="option"
                  aria-selected={false}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;