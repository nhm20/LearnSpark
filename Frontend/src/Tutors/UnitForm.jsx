import React, { useState } from "react";
import axios from "axios";

const UnitForm = ({
  formData,
  setFormData,
  headingName,
  handleInputChange,
  handleSubmit,
  editUnitId,
  onCancel,
}) => {
  const [preview, setPreview] = useState(formData.image || "");
  const [error, setError] = useState({ image: "" });
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
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
        console.log("Error uploading image:", err);
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

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 shadow-lg flex flex-col items-center"
    >
      <h2 className="text-2xl font-semibold text-white mb-6">{headingName}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center">
        {/* Left column */}
        <div className="space-y-4 w-full md:w-80">
          <div className="space-y-2">
            <label className="text-sm text-white">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-white bg-black border border-blue-700 rounded-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-white bg-black border border-blue-700 rounded-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white">Class Level</label>
            <input
              type="text"
              name="classLevel"
              value={formData.classLevel}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-white bg-black border border-blue-700 rounded-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4 w-full md:w-80">
          <div className="space-y-2">
            <label className="text-sm text-white">Unit Image</label>
            <div className="flex items-center gap-3">
              <label className="flex-1 cursor-pointer">
                <div
                  className={`flex items-center justify-center h-10 px-4 text-sm text-white bg-blue-800 hover:bg-blue-700 border border-blue-700 rounded-full transition-all ${
                    imageUploading ? "opacity-80 pointer-events-none" : ""
                  }`}
                >
                  {imageUploading ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading
                    </div>
                  ) : preview ? (
                    "Change Image"
                  ) : (
                    "Select Image"
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={imageUploading}
                  />
                </div>
              </label>

              <div className="w-10 h-10 rounded-full border-2 border-white bg-black overflow-hidden flex items-center justify-center shrink-0">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                )}
              </div>
            </div>
            {error.image && (
              <p className="text-red-500 text-xs mt-1">{error.image}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-white bg-black border border-blue-700 rounded-full focus:ring-2 focus:ring-blue-500"
              required
              min="0"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white">Time Limit (minutes)</label>
            <input
              type="number"
              name="timeLimit"
              value={formData.timeLimit}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-white bg-black border border-blue-700 rounded-full focus:ring-2 focus:ring-blue-500"
              required
              min="1"
            />
          </div>
        </div>
      </div>

      {/* Centered Buttons */}
      <div className="flex justify-center mt-8 gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 text-sm font-medium rounded-full bg-black text-white hover:bg-gray-700 border border-gray-600 transition"
          disabled={loading || imageUploading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 text-sm font-medium rounded-full bg-blue-700 text-white hover:bg-blue-600 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 min-w-24"
          disabled={loading || imageUploading}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {editUnitId ? "Updating" : "Creating"}
            </>
          ) : editUnitId ? (
            "Update"
          ) : (
            "Create"
          )}
        </button>
      </div>
    </form>
  );
};

export default UnitForm;
