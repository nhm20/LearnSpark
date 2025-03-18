import React, { useState } from "react";
import axios from "axios";
import TutorRegister2 from "./TutorRegister2"; // Import Step 2 component

const TutorRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState({});
  const [step, setStep] = useState(1); // Track current step

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      if (files[0] && files[0].type.startsWith("image/")) {
        setFormData((prevState) => ({ ...prevState, image: files[0] }));
        setError((prevState) => ({ ...prevState, image: "" }));

        const imageUrl = URL.createObjectURL(files[0]);
        setPreview(imageUrl);

        const formDataCloudinary = new FormData();
        formDataCloudinary.append("file", files[0]);
        formDataCloudinary.append(
          "upload_preset",
          import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET
        );

        try {
          const cloudinaryResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
            }/image/upload`,
            formDataCloudinary
          );

          if (cloudinaryResponse.data?.secure_url) {
            setFormData((prevState) => ({
              ...prevState,
              image: cloudinaryResponse.data.secure_url,
            }));
          } else {
            throw new Error("Cloudinary did not return a secure URL");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          setError((prevState) => ({
            ...prevState,
            image: "Image upload to Cloudinary failed.",
          }));
        }
      } else {
        setError((prevState) => ({
          ...prevState,
          image: "Invalid image file",
        }));
        setPreview(null);
      }
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
      setError((prevState) => ({ ...prevState, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    let newError = {};

    if (!formData.name.trim()) newError.name = "Name is required";
    if (!formData.email.trim()) newError.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newError.email = "Invalid email format";

    if (!formData.password.trim()) newError.password = "Password is required";
    else if (formData.password.length < 6)
      newError.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword.trim())
      newError.confirmPassword = "Confirm Password is required";
    else if (formData.password !== formData.confirmPassword)
      newError.confirmPassword = "Passwords do not match";

    if (!formData.gender.trim()) newError.gender = "Gender is required";
    if (!formData.image) newError.image = "Image is required";

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(2); // Move to Step 2
    } else {
      setError((prevState) => ({
        ...prevState,
        general: "Please fill in all required fields.",
      }));
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center m-4 p-2 rounded-2xl shadow-xl sm:w-full md:w-8/12 lg:w-8/12 xl:w-8/12">
      <div className="space-y-6 w-full">
        {step === 1 ? (
          <>
            {/* Name Field */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-3 bg-black text-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-black transition duration-300 shadow-sm focus:outline-none text-xl"
            />
            {error.name && (
              <div className="text-red-600 text-sm mt-1">{error.name}</div>
            )}

            {/* Email Field */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 bg-black rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm focus:outline-none text-xl text-white"
            />
            {error.email && (
              <div className="text-red-600 text-sm mt-1">{error.email}</div>
            )}

            {/* Password Field */}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 bg-black rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm focus:outline-none text-xl text-white"
            />
            {error.password && (
              <div className="text-red-600 text-sm mt-1">{error.password}</div>
            )}

            {/* Confirm Password Field */}
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full p-3 bg-black rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm focus:outline-none text-xl text-white"
            />
            {error.confirmPassword && (
              <div className="text-red-600 text-sm mt-1">
                {error.confirmPassword}
              </div>
            )}

            {/* Gender Field */}
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 bg-black rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm focus:outline-none text-xl text-white"
            >
              <option className="bg-black" value="">
                Select your gender
              </option>
              <option className="bg-black" value="male">
                Male
              </option>
              <option className="bg-black" value="female">
                Female
              </option>
              <option className="bg-black" value="other">
                Other
              </option>
            </select>
            {error.gender && (
              <div className="text-red-600 text-sm mt-1">{error.gender}</div>
            )}

            {/* Image Upload */}
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="w-full p-3 bg-black rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm focus:outline-none text-xl text-white"
            />
            {error.image && (
              <div className="text-red-600 text-sm mt-1">{error.image}</div>
            )}

            {/* Preview Image */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full mt-2"
              />
            )}

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Next
            </button>

            {error.general && (
              <div className="text-red-600 text-sm mt-1">{error.general}</div>
            )}
          </>
        ) : (
          <TutorRegister2  formDataStep1={formData} />
        )}
      </div>
    </div>
  );
};

export default TutorRegister;
