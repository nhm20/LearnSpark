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
  const [searchQuery, setSearchQuery] = useState(
    queryParams.get("query") || ""
  );
  const [selectedClassLevel, setSelectedClassLevel] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedSort, setSelectedSort] = useState("price");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ensure resetSearchQuery is properly defined
  const resetSearchQuery = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const endpoint = searchQuery
          ? "http://localhost:8000/api/user/search"
          : "http://localhost:8000/api/units";
        const params = searchQuery ? { query: searchQuery } : {};
        const response = await axios.get(endpoint, { params });

        const data = Array.isArray(response.data.units)
          ? response.data.units
          : Array.isArray(response.data)
          ? response.data
          : [];
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
      setLoading(false);
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleSearch = (query) => {
    try {
      const searchUrl = new URL(window.location);
      searchUrl.searchParams.set("query", query);
      window.history.pushState({}, "", searchUrl);
      setSearchQuery(query);
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
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-4">No courses found.</div>
      ) : (
        <CourseList filteredCourses={filteredCourses} />
      )}
      <Footer />
    </div>
  );
};



export default CoursesPage;
