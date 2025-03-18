import React, { useEffect, useState } from "react";
import axios from "axios";

const Units = () => {
  const [units, setUnits] = useState([]); // Store the fetched units
  const [loading, setLoading] = useState(true); // Loading state for fetching

  useEffect(() => {
    // Fetch data from the backend API
    const fetchUnits = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/units"); // Update with the actual URL of your backend
        setUnits(response.data); // Set fetched units to state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching units:", error);
        setLoading(false);
      }
    };

    fetchUnits(); // Call the function to fetch units
  }, []); // Empty dependency array ensures it runs once on component mount

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  // Group units by subject
  const groupedBySubject = units.reduce((acc, unit) => {
    if (!acc[unit.subject]) {
      acc[unit.subject] = [];
    }
    acc[unit.subject].push(unit);
    return acc;
  }, {});

  return (
    <div className="flex flex-wrap gap-6 p-6 justify-center">
      {Object.keys(groupedBySubject).map((subjectName, index) => (
        <div
          key={index}
          className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center w-80"
        >
          <h3 className="text-xl font-semibold mb-2">{subjectName}</h3>
          <ul className="text-sm">
            {groupedBySubject[subjectName].slice(0, 4).map((unit, idx) => (
              <li key={idx} className="py-1">
                {unit.name} {/* Display the unit's name */}
              </li>
            ))}
            {groupedBySubject[subjectName].length > 4 && (
              <li className="py-1 text-blue-200">...and more</li> // Indicate there are more units
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Units;
