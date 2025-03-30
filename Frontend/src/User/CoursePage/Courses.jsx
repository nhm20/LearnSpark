import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import CourseFilters from "./CourseFilters";
import CourseList from "./CourseList";

const CoursesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(queryParams.get("query") || "");
  const [selectedClassLevel, setSelectedClassLevel] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedSort, setSelectedSort] = useState("price");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);  // Track the current page for pagination
  const [hasMore, setHasMore] = useState(true); // To control when to stop loading more

  // Ensure resetSearchQuery is properly defined
  const resetSearchQuery = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const endpoint = searchQuery ? "http://localhost:8000/api/units/search/results" : "http://localhost:8000/api/units";
        const params = {
          query: searchQuery,
          page,
          limit: 10, // Set the limit per page
        };
        const response = await axios.get(endpoint, { params });

        const data = Array.isArray(response.data.units) ? response.data.units : [];
        setSearchResults((prevResults) => [...prevResults, ...data]);

        // Check if there are more results to load
        if (data.length < 10) {
          setHasMore(false); // No more data
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
      setLoading(false);
    };

    fetchSearchResults();
  }, [searchQuery, page]);

  const handleSearch = (query) => {
    try {
      const searchUrl = new URL(window.location);
      searchUrl.searchParams.set("query", query);
      window.history.pushState({}, "", searchUrl);
      setSearchQuery(query);
      setPage(1);  // Reset to page 1 when new search is triggered
      setSearchResults([]);  // Reset the results
      setHasMore(true);  // Enable "Load More" again for new search
    } catch (error) {
      console.error("Error updating search query in URL:", error);
    }
  };

  const filteredCourses = useMemo(() => {
    let result = Array.isArray(searchResults) ? searchResults : [];

    if (selectedClassLevel !== "All") {
      result = result.filter((unit) => unit.classLevel === selectedClassLevel);
    }
    if (selectedSubject !== "All") {
      result = result.filter((unit) => unit.subject === selectedSubject);
    }

    return result.sort((a, b) =>
      selectedSort === "price" ? a.price - b.price : b.timeLimit - a.timeLimit
    );
  }, [selectedClassLevel, selectedSubject, selectedSort, searchResults]);

  const uniqueSubjects = Array.from(
    new Set(searchResults.map((unit) => unit.subject))
  );

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="p-6">
      <Header onSearch={handleSearch} resetSearchQuery={resetSearchQuery} />
      <h1 className="text-2xl font-bold mb-6">Courses</h1>
      <CourseFilters
        selectedClassLevel={selectedClassLevel}
        setSelectedClassLevel={setSelectedClassLevel}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        subjects={uniqueSubjects}
      />
      <h1>Best Courses For You</h1>
      <CourseList filteredCourses={filteredCourses} loading={loading} />
      
      {loading && <div className="text-center py-4">Loading more...</div>}
      {!loading && hasMore && (
        <div className="text-center py-4">
          <button onClick={loadMore} className="px-6 py-2 bg-blue-500 text-white rounded">
            Load More
          </button>
        </div>
      )}
      {!hasMore && (
        <div className="text-center py-4 text-gray-500">No more courses available.</div>
      )}
      <Footer />
    </div>
  );
};

export default CoursesPage;
