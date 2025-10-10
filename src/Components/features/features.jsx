"use client";

import { AppContext } from "@/Context/appcontext";
import React, { useContext, useEffect, useState } from "react";

const FeaturesForm = () => {
  const { createfeatures, getfeatures, updatefeatures, deletefeatures } =
    useContext(AppContext);

  const emptyForm = {
    top: "",
    heading: "",
    paragraph: "",
    card1heading: "",
    card1paragraph: "",
    card2heading: "",
    card2paragraph: "",
    card3heading: "",
    card3paragraph: "",
  };

  const [formData, setFormData] = useState({ ...emptyForm });
  const [featuresData, setFeaturesData] = useState(null);
  const [featuresId, setFeaturesId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [previewData, setPreviewData] = useState({ ...emptyForm });
  const [savedData, setSavedData] = useState({ ...emptyForm });

  // Load existing feature data
  const loadData = async () => {
    const res = await getfeatures();
    if (res) {
      setFeaturesData(res);
      setFeaturesId(res._id);
      setPreviewData(res);
    } else {
      setFeaturesData(null);
      setFeaturesId(null);
      setPreviewData({ ...emptyForm });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update a field in formData and preview
  const handleFieldChange = (field, value) => {
    if (Object.keys(emptyForm).includes(field)) {
      const updatedData = { ...formData, [field]: value };
      setFormData(updatedData);
      setPreviewData(updatedData);
    }
  };

  // Submit feature (create or update)
  const submitFeatures = async (e) => {
    e.preventDefault();
    try {
      const finalData = { ...formData };

      if (featuresId && isEditMode) {
        const result = await updatefeatures(featuresId, finalData);
        if (result) {
          alert("Feature updated successfully!");
          setIsEditMode(false);
          setSavedData(result); // save the updated feature
        }
      } else {
        const result = await createfeatures(finalData);
        if (result) {
          alert("Feature created successfully!");
          setSavedData(result); // save newly created feature
        }
      }

      // Reload features from backend
      await loadData();

      // Clear form but keep saved preview
      setFormData({ ...emptyForm });
      setPreviewData({ ...emptyForm }); 
    } catch (error) {
      console.error("Error submitting features:", error);
      alert("Something went wrong!");
    }
  };

  // Edit existing feature
  const handleEdit = () => {
    if (featuresData) {
      setFormData({ ...featuresData });
      setPreviewData({ ...featuresData });
      setFeaturesId(featuresData._id);
      setIsEditMode(true);
    }
  };

  // Delete existing feature
  const handleDelete = async () => {
    if (!featuresId) {
      alert("No feature selected to delete!");
      return;
    }

    if (confirm("Are you sure you want to delete this feature?")) {
      const result = await deletefeatures(featuresId);
      if (result) {
        alert("Feature deleted successfully!");
        setFeaturesData(null);
        setFeaturesId(null);
        setFormData({ ...emptyForm });
        setPreviewData({ ...emptyForm });
        setSavedData({ ...emptyForm });
      }
    }
  };

  return (
    <div className="w-full h-screen bg-blue-950 overflow-auto">
      <div className="w-full max-w-5xl mx-auto p-4 h-screen">
        <div className="text-center mb-6 flex gap-4 justify-center flex-wrap">
          <button
            type="button"
            onClick={() => {
              setFormData({ ...emptyForm });
              setPreviewData({ ...emptyForm });
              setFeaturesId(null);
              setIsEditMode(false);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            + Create New Feature
          </button>

          {featuresData && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Edit Feature
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Delete Feature
              </button>
            </>
          )}
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md mb-6">
          <form onSubmit={submitFeatures} className="space-y-4">
            {/* Top */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Top
              </label>
              <input
                type="text"
                value={formData.top ?? ""}
                onChange={(e) => handleFieldChange("top", e.target.value)}
                placeholder="Enter top"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Heading */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Heading
              </label>
              <input
                type="text"
                value={formData.heading ?? ""}
                onChange={(e) => handleFieldChange("heading", e.target.value)}
                placeholder="Enter heading"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Paragraph */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Paragraph
              </label>
              <textarea
                value={formData.paragraph ?? ""}
                onChange={(e) => handleFieldChange("paragraph", e.target.value)}
                placeholder="Enter paragraph"
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={3}
              ></textarea>
            </div>

            {/* Card 1 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Card 1 Heading
              </label>
              <input
                type="text"
                value={formData.card1heading ?? ""}
                onChange={(e) =>
                  handleFieldChange("card1heading", e.target.value)
                }
                placeholder="Enter card 1 heading"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Card 1 Paragraph
              </label>
              <textarea
                value={formData.card1paragraph ?? ""}
                onChange={(e) =>
                  handleFieldChange("card1paragraph", e.target.value)
                }
                placeholder="Enter card 1 paragraph"
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={2}
              ></textarea>
            </div>

            {/* Card 2 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Card 2 Heading
              </label>
              <input
                type="text"
                value={formData.card2heading ?? ""}
                onChange={(e) =>
                  handleFieldChange("card2heading", e.target.value)
                }
                placeholder="Enter card 2 heading"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Card 2 Paragraph
              </label>
              <textarea
                value={formData.card2paragraph ?? ""}
                onChange={(e) =>
                  handleFieldChange("card2paragraph", e.target.value)
                }
                placeholder="Enter card 2 paragraph"
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={2}
              ></textarea>
            </div>

            {/* Card 3 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Card 3 Heading
              </label>
              <input
                type="text"
                value={formData.card3heading ?? ""}
                onChange={(e) =>
                  handleFieldChange("card3heading", e.target.value)
                }
                placeholder="Enter card 3 heading"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Card 3 Paragraph
              </label>
              <textarea
                value={formData.card3paragraph ?? ""}
                onChange={(e) =>
                  handleFieldChange("card3paragraph", e.target.value)
                }
                placeholder="Enter card 3 paragraph"
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={2}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-[30%] bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Save Feature
            </button>
          </form>
        </div>

        {/* Live Preview */}
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-2">
            {previewData.top || savedData.top}
          </h3>
          <h2 className="text-2xl font-semibold mb-2">
            {previewData.heading || savedData.heading}
          </h2>
          <p className="mb-4">{previewData.paragraph || savedData.paragraph}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-bold">
                {previewData.card1heading || savedData.card1heading}
              </h4>
              <p>{previewData.card1paragraph || savedData.card1paragraph}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-bold">
                {previewData.card2heading || savedData.card2heading}
              </h4>
              <p>{previewData.card2paragraph || savedData.card2paragraph}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-bold">
                {previewData.card3heading || savedData.card3heading}
              </h4>
              <p>{previewData.card3paragraph || savedData.card3paragraph}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesForm;
