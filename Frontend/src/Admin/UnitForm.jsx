import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const UnitForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  editUnitId,
  classNames = [], // Default empty array
  subjects = [], // Default empty array
}) => {
  const [filteredClasses, setFilteredClasses] = useState(classNames);
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);
  const classRef = useRef(null);
  const subjectRef = useRef(null);

  // Filter options based on input value
  const filterOptions = (event, options, setFilteredOptions) => {
    const value = event.target.value.toLowerCase();

    if (!value.trim()) {
      setFilteredOptions(options); // Show all options when input is empty
    } else {
      setFilteredOptions(
        options
          .filter((opt) => opt.toLowerCase().includes(value)) // Filter matching options
          .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) // Sort alphabetically
      );
    }
    handleInputChange(event);
  };

  // Ensure full list appears on focus
  const handleFocus = (options, setFilteredOptions) => {
    setFilteredOptions(options); // Show all options when input is focused
  };

  // Handle outside click to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        classRef.current &&
        !classRef.current.contains(event.target) &&
        subjectRef.current &&
        !subjectRef.current.contains(event.target)
      ) {
        setFilteredClasses([]); // Close class dropdown
        setFilteredSubjects([]); // Close subject dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input for Unit Name */}
        <input
          type="text"
          name="name"
          placeholder="Unit Name"
          value={formData.name}
          onChange={handleInputChange}
          className="p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Searchable Select for Class Level */}
        <div className="relative" ref={classRef}>
          <input
            type="text"
            name="classLevel"
            placeholder="Class Level"
            value={formData.classLevel}
            onChange={(e) => filterOptions(e, classNames, setFilteredClasses)}
            onFocus={() => handleFocus(classNames, setFilteredClasses)}
            className="p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            required
          />
          {filteredClasses.length > 0 && (
            <ul className="absolute left-0 w-full bg-gray-800 text-white rounded-lg mt-1 shadow-lg max-h-40 overflow-y-auto">
              {filteredClasses.map((className, index) => (
                <li
                  key={index}
                  onClick={() => {
                    handleInputChange({
                      target: { name: "classLevel", value: className },
                    });
                    setFilteredClasses([]); // Close dropdown
                  }}
                  className="p-2 hover:bg-gray-700 cursor-pointer"
                >
                  {className}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Searchable Select for Subject */}
        <div className="relative" ref={subjectRef}>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) => filterOptions(e, subjects, setFilteredSubjects)}
            onFocus={() => handleFocus(subjects, setFilteredSubjects)}
            className="p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            required
          />
          {filteredSubjects.length > 0 && (
            <ul className="absolute left-0 w-full bg-gray-800 text-white rounded-lg mt-1 shadow-lg max-h-40 overflow-y-auto">
              {filteredSubjects.map((subject, index) => (
                <li
                  key={index}
                  onClick={() => {
                    handleInputChange({
                      target: { name: "subject", value: subject },
                    });
                    setFilteredSubjects([]); // Close dropdown
                  }}
                  className="p-2 hover:bg-gray-700 cursor-pointer"
                >
                  {subject}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Input for Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          className="p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="0"
          step="0.01"
          required
        />

        {/* Input for Time Limit */}
        <input
          type="number"
          name="timeLimit"
          placeholder="Time Limit (in hours)"
          value={formData.timeLimit}
          onChange={handleInputChange}
          className="p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full mt-4 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {editUnitId ? "Update Unit" : "Add Unit"}
      </button>
    </form>
  );
};

// Prop validation
UnitForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  editUnitId: PropTypes.string,
  classNames: PropTypes.arrayOf(PropTypes.string),
  subjects: PropTypes.arrayOf(PropTypes.string),
};

export default UnitForm;
