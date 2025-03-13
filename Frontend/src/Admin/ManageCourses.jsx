import React, { useEffect, useState } from "react";
import axios from "axios";
import UnitForm from "./UnitForm";

const ManageCourses = () => {
  const [units, setUnits] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    classLevel: "",
    subject: "",
    price: 0,
    timeLimit: 0,
  });
  const [editUnitId, setEditUnitId] = useState(null);

  // State to store unique class names and subjects
  const [classNames, setClassNames] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Fetch units, class names, and subjects on component mount
  useEffect(() => {
    fetchUnits();
    fetchClassNames();
  }, []);

  // Fetch units from the backend
  const fetchUnits = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/units`
      );
      if (Array.isArray(response.data)) {
        setUnits(response.data);
      } else {
        setUnits([]);
      }
    } catch (error) {
      setUnits([]);
    }
  };

  // Fetch unique class names from the backend
  const fetchClassNames = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/units/class-names"
      );
      if (response.data && response.data.length > 0) {
        console.log("Class Names:", response.data);
        setClassNames(response.data);
      } else {
        console.log("No class names received.");
        setClassNames([]); // Or you can set a default message if you want
      }
    } catch (error) {
      console.error("Error fetching class names:", error.message);
      setClassNames([]); // Optionally handle error by resetting or showing a default value
    }
  };

  const fetchSubjects = async (classLevel) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/units/subjects"
      );
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error.message);
    }
  };

  // Handle input change
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Fetch subjects when class level changes
    if (name === "classLevel") {
      await fetchSubjects(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUnitId) {
        await axios.put(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/units/${editUnitId}`,
          formData
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/units`,
          formData
        );
      }
      fetchUnits();
      setFormData({
        name: "",
        classLevel: "",
        subject: "",
        price: 0,
        timeLimit: 0,
      });
      setEditUnitId(null);
    } catch (error) {
      console.error("Error saving unit:", error.message);
    }
  };

  // Handle edit
  const handleEdit = (unit) => {
    setFormData(unit);
    setEditUnitId(unit?._id);
    fetchSubjects(unit.classLevel); // Fetch subjects for the edited unit's class level
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/units/${id}`
      );
      fetchUnits();
    } catch (error) {
      console.error("Error deleting unit:", error);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-700 min-h-screen text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Manage Course Units
      </h2>

      <div className="max-w-3xl mx-auto mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <UnitForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          editUnitId={editUnitId}
          classNames={classNames} // Pass class names as a prop
          subjects={subjects} // Pass subjects as a prop
        />
      </div>

      <div className="space-y-6">
        {units && units.length > 0 ? (
          units.map((unit) => (
            <div
              key={unit?._id}
              className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{unit?.name}</h3>
                  <p className="text-sm text-gray-400">
                    {unit?.classLevel} - {unit?.subject} | ${unit?.price} |{" "}
                    {unit?.timeLimit} hours
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(unit)}
                    className="px-6 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(unit?._id)}
                    className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No units available.</p>
        )}
      </div>
    </div>
  );
};

export default ManageCourses;
