import React from "react";

const CourseFilters = ({
  selectedClassLevel,
  setSelectedClassLevel,
  selectedSubject,
  setSelectedSubject,
  selectedSort,
  setSelectedSort,
  subjects,
}) => {
  const handleReset = () => {
    setSelectedClassLevel("All");
    setSelectedSubject("All");
    setSelectedSort("price");
  };

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap md:items-end justify-between gap-4 mb-8 bg-black p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
        <div className="relative">
          <label
            htmlFor="class-level"
            className="block text-xs font-medium text-gray-300 mb-1 ml-3"
          >
            Class Level
          </label>
          <select
            id="class-level"
            value={selectedClassLevel}
            onChange={(e) => setSelectedClassLevel(e.target.value)}
            className="w-full sm:w-40 px-4 py-2 border border-gray-700 bg-gray-900 text-white text-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-600 appearance-none"
          >
            <option value="All">All Levels</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 11">Class 11</option>
            <option value="Class 12">Class 12</option>
          </select>
        </div>

        <div className="relative">
          <label
            htmlFor="subject"
            className="block text-xs font-medium text-gray-300 mb-1 ml-3"
          >
            Subject
          </label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full sm:w-40 px-4 py-2 border border-gray-700 bg-gray-900 text-white text-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-600 appearance-none"
          >
            <option value="All">All Subjects</option>
            {subjects.map((subject, idx) => (
              <option key={idx} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label
            htmlFor="sort"
            className="block text-xs font-medium text-gray-300 mb-1 ml-3"
          >
            Sort By
          </label>
          <select
            id="sort"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="w-full sm:w-32 px-4 py-2 border border-gray-700 bg-gray-900 text-white text-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-600 appearance-none"
          >
            <option value="price">Price</option>
            <option value="timeLimit">Time Limit</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleReset}
        className="px-4 py-2 text-sm font-medium text-gray-300 bg-transparent border border-gray-700 rounded-full hover:bg-gray-800 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-800 h-fit self-start md:self-auto"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default CourseFilters;
