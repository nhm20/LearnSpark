import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TutorRegister2 = ({ formDataStep1 }) => {
  const [formData, setFormData] = useState({
    skills: "",
    college: "",
    placeOfEducation: "",
    address: "",
    age: "",
    degree: "",
    bank: "",
    accNo: "",
  });

  const skillSet = [
    "Maths",
    "Science",
    "English",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
  ];

  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setError((prevState) => ({ ...prevState, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    let newError = {};

    if (!formData.skills.trim()) newError.skills = "Skills are required";
    if (!formData.college.trim()) newError.college = "College is required";
    if (!formData.placeOfEducation.trim())
      newError.placeOfEducation = "Place of Education is required";
    if (!formData.address.trim()) newError.address = "Address is required";
    if (!formData.age.trim()) newError.age = "Age is required";
    else if (!/^\d+$/.test(formData.age)) newError.age = "Age must be a number";
    else if (formData.age < 18 || formData.age > 100)
      newError.age = "Age must be between 18 and 100";
    if (!formData.degree.trim()) newError.degree = "Degree is required";
    if (!formData.bank.trim()) newError.bank = "Bank name is required";
    if (!formData.accNo.trim()) newError.accNo = "Account number is required";
    else if (!/^\d+$/.test(formData.accNo))
      newError.accNo = "Account number must be numeric";

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const finalFormData = { ...formDataStep1, ...formData };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/tutor/register`,
          finalFormData
        );
        if (response.data.success) {
          navigate("/tutor/dashboard");
        } else {
          setError({ ...error, general: response.data.message });
        }
      } catch (err) {
        setError({
          ...error,
          general: "Registration failed. Please try again." + err.message,
        });
      }
    }
  };

  return (
    <div className="h-full  w-full flex items-center justify-center m-4 p-2 rounded-2xl shadow-xl sm:w-full md:w-8/12 lg:w-8/12 xl:w-8/12">
      <div className="space-y-6 w-full">
        {/* Skills Dropdown */}
        <select
          name="skills"
          value={formData.skills}
          onChange={handleChange}
              className="w-full p-3 bg-black text-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-black transition duration-300 shadow-sm focus:outline-none text-xl"
        >
          <option value="">Select your skill</option>
          {skillSet.map((skill, index) => (
            <option className="bg-black" key={index} value={skill}>
              {skill}
            </option>
          ))}
        </select>
        {error.skills && (
          <div className="text-red-600 text-sm mt-1">{error.skills}</div>
        )}

        {/* College Input */}
        <input
          type="text"
          name="college"
          value={formData.college}
          onChange={handleChange}
          placeholder="Enter your college"
              className="w-full p-3 bg-black text-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-black transition duration-300 shadow-sm focus:outline-none text-xl"
        />
        {error.college && (
          <div className="text-red-600 text-sm mt-1">{error.college}</div>
        )}

        {/* Place of Education Input */}
        <input
          type="text"
          name="placeOfEducation"
          value={formData.placeOfEducation}
          onChange={handleChange}
          placeholder="Place of Education"
              className="w-full p-3 bg-black text-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-black transition duration-300 shadow-sm focus:outline-none text-xl"
        />
        {error.placeOfEducation && (
          <div className="text-red-600 text-sm mt-1">
            {error.placeOfEducation}
          </div>
        )}

        {/* Address Input */}
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
              className="w-full p-3 bg-black text-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-black transition duration-300 shadow-sm focus:outline-none text-xl"
        />
        {error.address && (
          <div className="text-red-600 text-sm mt-1">{error.address}</div>
        )}

        {/* Age Input */}
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your age"
              className="w-full p-3 bg-black text-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-black transition duration-300 shadow-sm focus:outline-none text-xl"
          min="18"
          max="100"
        />
        {error.age && (
          <div className="text-red-600 text-sm mt-1">{error.age}</div>
        )}

        {/* Degree Input */}
        <input
          type="text"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          placeholder="Enter your degree"
              className="w-full p-3 bg-black text-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-black transition duration-300 shadow-sm focus:outline-none text-xl"
        />
        {error.degree && (
          <div className="text-red-600 text-sm mt-1">{error.degree}</div>
        )}

        {/* Bank Input */}
        <input
          type="text"
          name="bank"
          value={formData.bank}
          onChange={handleChange}
          placeholder="Enter your bank name"
              className="w-full p-3 bg-black text-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-black transition duration-300 shadow-sm focus:outline-none text-xl"
        />
        {error.bank && (
          <div className="text-red-600 text-sm mt-1">{error.bank}</div>
        )}

        {/* Account Number Input */}
        <input
          type="text"
          name="accNo"
          value={formData.accNo}
          onChange={handleChange}
          placeholder="Enter your account number"
              className="w-full p-3 bg-black text-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-black transition duration-300 shadow-sm focus:outline-none text-xl"
        />
        {error.accNo && (
          <div className="text-red-600 text-sm mt-1">{error.accNo}</div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Submit
        </button>

        {error.general && (
          <div className="text-red-600 text-sm mt-1">{error.general}</div>
        )}
      </div>
    </div>
  );
};

export default TutorRegister2;
