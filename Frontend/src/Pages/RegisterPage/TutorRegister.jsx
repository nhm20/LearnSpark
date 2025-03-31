import React, { useState } from "react";
import axios from "axios";
import TutorRegister2 from "./TutorRegister2";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      if (files[0] && files[0].type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, image: files[0] }));
        setError((prev) => ({ ...prev, image: "" }));

        const imageUrl = URL.createObjectURL(files[0]);
        setPreview(imageUrl);

        const formDataCloudinary = new FormData();
        formDataCloudinary.append("file", files[0]);
        formDataCloudinary.append(
          "upload_preset",
          import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET
        );

        try {
          setLoading(true);
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
            }/image/upload`,
            formDataCloudinary
          );
          setFormData((prev) => ({
            ...prev,
            image: response.data.secure_url,
          }));
        } catch (err) {
          setError((prev) => ({
            ...prev,
            image: "Image upload failed",
          }));
        } finally {
          setLoading(false);
        }
      } else {
        setError((prev) => ({
          ...prev,
          image: "Please select a valid image",
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newError = {};
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
    if (!formData.gender) newError.gender = "Gender is required";
    if (!formData.image) newError.image = "Profile image is required";

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto p-4 sm:max-w-sm">
      <div className="space-y-2">
        {step === 1 ? (
          <>
            <h2 className="text-lg font-medium text-center mb-3">
              Tutor Registration
            </h2>

            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm"
              />
              {error.name && (
                <p className="text-red-500 text-xs mt-1">{error.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm"
              />
              {error.email && (
                <p className="text-red-500 text-xs mt-1">{error.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm"
              />
              {error.password && (
                <p className="text-red-500 text-xs mt-1">{error.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm"
              />
              {error.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {error.confirmPassword}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <div className="relative">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm bg-black text-white appearance-none"
                >
                  <option value="" className="bg-black text-white">
                    Select gender
                  </option>
                  <option value="male" className="bg-black text-white">
                    Male
                  </option>
                  <option value="female" className="bg-black text-white">
                    Female
                  </option>
                  <option value="other" className="bg-black text-white">
                    Other
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
                  <svg
                    className="fill-current h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {error.gender && (
                <p className="text-red-500 text-xs mt-1">{error.gender}</p>
              )}
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Profile Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="w-full text-xs file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
              {error.image && (
                <p className="text-red-500 text-xs mt-1">{error.image}</p>
              )}
              {preview && (
                <div className="mt-2 flex justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-full border border-gray-200"
                  />
                </div>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={loading}
              className={`w-full py-2 rounded font-medium text-white text-sm mt-2 ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          </>
        ) : (
          <TutorRegister2 formDataStep1={formData} />
        )}
      </div>
    </div>
  );
};

export default TutorRegister;
