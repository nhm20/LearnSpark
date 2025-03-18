import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDebounce } from "use-debounce";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
          `http://localhost:8000/api/user/search`,
          {
            params: { query: debouncedQuery },
          }
        );
        const results = response.data.units.map((unit) => unit.name) || [];
        setRecommendations(results.slice(0, 4)); // Show only the first 4 recommendations
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

  // Handle search submission
  const handleSearch = () => {
    if (query.trim() === "") return; // Ignore empty queries

    console.log("Search triggered with query:", query);
    if (typeof onSearch === "function") {
      onSearch(query);
    }
    navigate(`/courses?query=${query}`); // Navigate to the search results page
    setRecommendations([]); // Clear recommendations after search
  };

  // Handle selecting a recommendation
  const handleSelectRecommendation = (item) => {
    setQuery(item); // Set the query to the selected recommendation
    setRecommendations([]); // Clear recommendations immediately
    navigate(`/courses?query=${item}`); // Navigate directly to the selected item's page
  };

  // Clear recommendations if the query is empty
  useEffect(() => {
    if (query.trim() === "") {
      setRecommendations([]);
    }
  }, [query]);

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for courses or tutors..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        className="text-white w-full px-4 py-2 border-2 border-blue-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-900"
        aria-label="Search for courses or tutors"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-600"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Loading State */}
      {loading && (
        <div
          aria-live="assertive"
          className="absolute mt-2 w-full bg-black border border-black rounded-lg shadow-lg"
        >
          <p className="px-4 py-2 text-white">Loading...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          aria-live="assertive"
          className="absolute mt-2 w-full bg-white border border-blue-300 rounded-lg shadow-lg"
        >
          <p className="px-4 py-2 text-red-500">{error}</p>
        </div>
      )}

      {!loading && recommendations.length > 0 && (
        <div className="absolute mt-2 p-2 w-full bg-black border-2 border-blue-800 rounded-2xl shadow-lg z-10">
          <ul className="max-h-60 overflow-y-auto">
            {recommendations.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 text-white hover:bg-blue-400 cursor-pointer"
                onClick={() => handleSelectRecommendation(item)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSelectRecommendation(item);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Select ${item}`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
