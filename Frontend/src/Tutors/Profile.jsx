import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Sidebar from "./Components/Sidebar";
import { FaCamera, FaStar, FaRupeeSign, FaUserCircle } from "react-icons/fa";
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from "react-icons/io";

const skills = [
  "English",
  "Maths",
  "Science",
  "Social",
  "Physics",
  "Chemistry",
  "Biology",
];

const degrees = [
  { label: "10th Standard", value: 10 },
  { label: "12th Standard", value: 12 },
  { label: "Bachelor's Degree", value: 16 },
  { label: "Master's Degree", value: 18 },
  { label: "PhD", value: 22 },
];

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    skill: "",
    degree: "",
    accNo: "",
    image: "",
  });
  const [preview, setPreview] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [error, setError] = useState({ image: "" });

  useEffect(() => {
    if (user) {
      setFormData({
        skill: user.skill || "",
        degree: user.degree || "",
        accNo: user.accNo || "",
        image: user.image || "",
      });
      setPreview(user.image || "");
      setImageError(false);
    }
  }, [user]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "accNo" && value && !/^\d*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file && file.type.startsWith("image/")) {
      const formDataCloudinary = new FormData();
      formDataCloudinary.append("file", file);
      formDataCloudinary.append(
        "upload_preset",
        import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET
      );
      try {
        setImageUploading(true);
        setError((prev) => ({ ...prev, image: "" }));

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
        setPreview(response.data.secure_url);
      } catch (err) {
        setError((prev) => ({ ...prev, image: "Image upload failed" }));
      } finally {
        setImageUploading(false);
      }
    } else {
      setError((prev) => ({
        ...prev,
        image: "Please select a valid image file",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    if (
      !formData.skill ||
      !formData.degree ||
      !formData.image ||
      !formData.accNo
    ) {
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await axios.put(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/tutors/profile/${user._id}`,
        {
          ...formData,
          degree: Number(formData.degree),
        }
      );

      if (response.data.success) {
        return;
      }
    } catch (err) {
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto md:ml-48 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-blue-500">
            Profile Settings
          </h1>

          <div className="bg-gray-900 rounded-xl border border-blue-800 overflow-hidden">
            <div className="p-4 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="flex flex-col items-center md:items-start md:w-1/3 space-y-4">
                  <div className="relative group">
                    {preview && !imageError ? (
                      <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-blue-500 overflow-hidden">
                        <img
                          src={preview}
                          alt="Profile"
                          className="w-full h-full object-cover transition duration-300 group-hover:opacity-80"
                          onError={handleImageError}
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-blue-500 flex items-center justify-center bg-gray-800">
                        <FaUserCircle className="text-6xl text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                      <label
                        className={`cursor-pointer rounded-full p-2 transition ${
                          imageUploading
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        aria-label="Upload profile image"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          disabled={imageUploading}
                        />
                        <FaCamera className="text-lg md:text-xl" />
                      </label>
                    </div>
                  </div>

                  <div className="text-center md:text-left">
                    <h2 className="text-lg md:text-xl font-semibold">
                      {user?.name}
                    </h2>
                    <p className="text-blue-400 text-sm md:text-base">
                      {user?.email}
                    </p>
                  </div>

                  <div className="w-full space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-blue-900 rounded">
                      <p>Rating</p>
                      <div className="flex items-center text-yellow-400">
                        <FaStar className="mr-1" />
                        {user?.rating?.toFixed(1) || "N/A"}
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-900 rounded">
                      <p>Earnings</p>
                      <p className="flex items-center text-green-400">
                        <FaRupeeSign className="mr-1" />
                        {user?.total?.toLocaleString() || 0}
                      </p>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-900 rounded">
                      <p>Status</p>
                      <p
                        className={`flex items-center ${
                          user?.online ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {user?.online ? (
                          <>
                            <IoMdRadioButtonOn className="mr-1" /> Online
                          </>
                        ) : (
                          <>
                            <IoMdRadioButtonOff className="mr-1" /> Offline
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
                    Edit Profile
                  </h3>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-3 md:space-y-4"
                  >
                    <div>
                      <label className="block text-sm md:text-base font-medium mb-1 text-blue-400">
                        Skill*
                      </label>
                      <select
                        name="skill"
                        value={formData.skill}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 border border-blue-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select a subject</option>
                        {skills.map((skill) => (
                          <option key={skill} value={skill}>
                            {skill}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm md:text-base font-medium mb-1 text-blue-400">
                        Highest Degree*
                      </label>
                      <select
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 border border-blue-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select your degree</option>
                        {degrees.map((degree) => (
                          <option key={degree.value} value={degree.value}>
                            {degree.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm md:text-base font-medium mb-1 text-blue-400">
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="accNo"
                        value={formData.accNo}
                        onChange={handleChange}
                        placeholder="Enter your account number"
                        maxLength={18}
                        className="w-full p-2 bg-gray-800 border border-blue-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || imageUploading}
                      className={`mt-4 px-6 py-2 rounded-md font-medium transition ${
                        isSubmitting || imageUploading
                          ? "bg-blue-900 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
