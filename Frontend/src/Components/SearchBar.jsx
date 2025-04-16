import React, { useState, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDebounce } from "use-debounce";

const SearchBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const queryParams = new URLSearchParams(location.search);
  const urlQuery = queryParams.get("query") || "";

  const [query, setQuery] = useState(urlQuery);
  const [debouncedQuery] = useDebounce(query, 300);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setRecommendations([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setRecommendations([]);
      return;
    }

    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/units/search/results`,
          { params: { query: debouncedQuery } }
        );
        const results = response.data.units.map((unit) => ({
          name: unit.name,
          id: unit._id,
          slug: unit.slug || unit.name.toLowerCase().replace(/\s+/g, "-"),
        }));
        setRecommendations(results.slice(0, 4));
      } catch (error) {
        setError("Failed to fetch results");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [debouncedQuery]);

  const handleSearch = () => {
    if (query.trim() === "") return;
    navigate(`/courses?query=${encodeURIComponent(query)}`);
    setRecommendations([]);
  };

  const handleSelectRecommendation = (item) => {
    navigate(`/course/${item.id}`);
    setRecommendations([]);
  };
  return (
    <div className="relative w-full max-w-xl mx-4" ref={searchRef}>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full px-4 py-2.5 pr-10 bg-black text-gray-100 border-2 border-blue-700 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-500 transition-all duration-200"
        />
        <button
          onClick={handleSearch}
          className="absolute right-3 text-blue-400 hover:text-orange-400 transition-colors"
          aria-label="Search"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </button>
      </div>

      {recommendations.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-bg-black border border-blue-800 rounded-lg shadow-xl overflow-hidden">
          {recommendations.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelectRecommendation(item)}
              className="px-4 py-3 text-gray-100 hover:bg-blue-900/50 cursor-pointer transition-colors border-b border-blue-900/50 last:border-b-0"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <div className="mt-2 px-3 py-2 text-sm text-orange-400 bg-bg-black border border-orange-800/50 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
