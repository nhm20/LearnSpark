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
  const searchQuery = queryParams.get("query") || "";

  const [selectedClassLevel, setSelectedClassLevel] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedSort, setSelectedSort] = useState("price");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const endpoint = searchQuery
          ? `${import.meta.env.VITE_APP_SERVER_URL}/api/units/search/results`
          : `${import.meta.env.VITE_APP_SERVER_URL}/api/units`;

        const response = await axios.get(endpoint, {
          params: { query: searchQuery, page, limit: 8 },
        });

        const data = Array.isArray(response.data.units)
          ? response.data.units
          : [];
        setSearchResults((prev) => [...(page === 1 ? [] : prev), ...data]);
        setHasMore(data.length === 10);
      } catch (error) {
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, page]);

  const filteredCourses = useMemo(() => {
    let result = [...searchResults];
    if (selectedClassLevel !== "All") {
      result = result.filter((unit) => unit.classLevel === selectedClassLevel);
    }
    if (selectedSubject !== "All") {
      result = result.filter((unit) => unit.subject === selectedSubject);
    }
    return result.sort((a, b) =>
      selectedSort === "price" ? a.price - b.price : b.timeLimit - a.timeLimit
    );
  }, [searchResults, selectedClassLevel, selectedSubject, selectedSort]);

  const uniqueSubjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Social Studies",
    "English",
    "Science",
  ];

  const loadMore = () => setPage((prev) => prev + 1);

  return (
    <>
      <div className="relative min-h-[65vh] bg-gradient-to-b from-transparent via-[#0C014D] via-40% to-black flex items-end pb-24 overflow-x-hidden">
        <div className="w-full">
          <Header />
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-semibold text-center mb-8 text-white">
                Learn the Topic You Like
              </h1>

              <div className="mb-8">
                <CourseFilters
                  selectedClassLevel={selectedClassLevel}
                  setSelectedClassLevel={setSelectedClassLevel}
                  selectedSubject={selectedSubject}
                  setSelectedSubject={setSelectedSubject}
                  selectedSort={selectedSort}
                  setSelectedSort={setSelectedSort}
                  subjects={uniqueSubjects}
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-200 mb-6">
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : "Best Courses For You"}
              </h2>

              <CourseList filteredCourses={filteredCourses} loading={loading} />

              {hasMore && (
                <div className="text-center py-8">
                  <button
                    onClick={loadMore}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesPage;
