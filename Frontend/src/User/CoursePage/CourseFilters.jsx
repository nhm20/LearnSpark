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
    <div className="flex flex-wrap gap-4 mb-6 items-center">
    
      <select
        value={selectedClassLevel}
        onChange={(e) => setSelectedClassLevel(e.target.value)}
        className="border px-4 py-2 rounded-lg"
      >
        <option value="All">All Levels</option>
        <option value="Class 3">Class 3</option>
        <option value="Class 4">Class 4</option>
      </select>

      <select
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
        className="border px-4 py-2 rounded-lg"
      >
        <option value="All">All Subjects</option>
        {subjects.map((subject, idx) => (
          <option key={idx} value={subject}>
            {subject}
          </option>
        ))}
      </select>

      <select
        value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value)}
        className="border px-4 py-2 rounded-lg"
      >
        <option value="price">Sort By Price</option>
        <option value="timeLimit">Sort By Time Limit</option>
      </select>
    </div>
  );
};

export default CourseFilters;
