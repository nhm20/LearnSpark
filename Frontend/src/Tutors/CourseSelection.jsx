import React, { useState } from "react";

const CourseSelection = ({ availableUnits, onSelect }) => {
  const [selectedUnits, setSelectedUnits] = useState([]);

  const handleSelectUnit = (unit) => {
    setSelectedUnits((prev) =>
      prev.includes(unit) ? prev.filter((u) => u !== unit) : [...prev, unit]
    );
  };

  const handleSubmit = () => {
    onSelect(selectedUnits);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Select Courses to Teach</h2>
      <div className="mt-4 space-y-2">
        {availableUnits.map((unit) => (
          <label key={unit} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedUnits.includes(unit)}
              onChange={() => handleSelectUnit(unit)}
              className="w-4 h-4 text-blue-600"
            />
            <span>{unit}</span>
          </label>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Save Selection
      </button>
    </div>
  );
};

export default CourseSelection;
