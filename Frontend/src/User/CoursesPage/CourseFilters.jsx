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
  return (
    <div className="flex flex-wrap gap-4 mb-8 items-center bg-black p-4 rounded-lg">
      <div className="relative flex-1 min-w-[200px]">
        <label htmlFor="class-level" className="block text-sm font-medium text-white mb-1">
          Class Level
        </label>
        <select
          id="class-level"
          value={selectedClassLevel}
          onChange={(e) => setSelectedClassLevel(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-600 bg-black text-white rounded-md focus:ring-2 focus:ring-white focus:border-white"
        >
          <option value="All">All Levels</option>
          <option value="Class 3">Class 3</option>
          <option value="Class 4">Class 4</option>
        </select>
      </div>

      <div className="relative flex-1 min-w-[200px]">
        <label htmlFor="subject" className="block text-sm font-medium text-white mb-1">
          Subject
        </label>
        <select
          id="subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-600 bg-black text-white rounded-md focus:ring-2 focus:ring-white focus:border-white"
        >
          <option value="All">All Subjects</option>
          {subjects.map((subject, idx) => (
            <option key={idx} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="relative flex-1 min-w-[200px]">
        <label htmlFor="sort" className="block text-sm font-medium text-white mb-1">
          Sort By
        </label>
        <select
          id="sort"
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-600 bg-black text-white rounded-md focus:ring-2 focus:ring-white focus:border-white"
        >
          <option value="price">Price</option>
          <option value="timeLimit">Time Limit</option>
        </select>
      </div>
    </div>
  );
};

export default CourseFilters;