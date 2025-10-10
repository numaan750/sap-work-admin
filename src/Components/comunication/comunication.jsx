"use client";

import { AppContext } from "@/Context/appcontext";
import React, { useContext, useEffect, useState } from "react";

const CommunicationForm = () => {
  const {
    createcomunication,
    getcomunication,
    updatecomunication,
    deletecomunication,
  } = useContext(AppContext);

  const emptyForm = {
    heading: "",
    mainimg: "",
    description1: "",
    description2: "",
    description3: "",
    description4: "",
  };

  const [formData, setFormData] = useState({ ...emptyForm });
  const [comunicationData, setComunicationData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [comunicationId, setComunicationId] = useState(null);
  const [previewData, setPreviewData] = useState({ ...emptyForm });
  const [savedData, setSavedData] = useState({ ...emptyForm });

  const loadData = async () => {
    const res = await getcomunication();
    if (res) {
      setComunicationData(res);
      setComunicationId(res._id);
      setPreviewData(res);
    } else {
      setComunicationData(null);
      setComunicationId(null);
      setPreviewData({ ...emptyForm });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFieldChange = (field, value) => {
    if (Object.keys(emptyForm).includes(field)) {
      const updatedData = { ...formData, [field]: value };
      setFormData(updatedData);
      setPreviewData(updatedData);
    }
  };

  const submitComunication = async (e) => {
    e.preventDefault();
    try {
      const finalData = { ...formData };

      if (comunicationData && isEditMode) {
        const result = await updatecomunication(
          comunicationData._id,
          finalData
        );
        if (result) {
          alert("Communication updated successfully!");
          setIsEditMode(false);
          setSavedData(result);
        }
      } else {
        const result = await createcomunication(finalData);
        if (result) {
          alert("Communication created successfully!");
          setSavedData(result);
        }
      }

      await loadData();
      setFormData({ ...emptyForm });
      setPreviewData({ ...emptyForm });
    } catch (error) {
      console.error("Error submitting communication:", error);
      alert("Something went wrong!");
    }
  };

  const handleEdit = () => {
    if (comunicationData) {
      setFormData({ ...comunicationData });
      setIsEditMode(true);
      setComunicationId(comunicationData._id);
      setPreviewData({ ...comunicationData });
    }
  };

  const handleDelete = async () => {
    if (!comunicationId) {
      alert("No communication section selected to delete!");
      return;
    }

    if (confirm("Are you sure you want to delete the communication section?"));
    {
      const result = await deletecomunication(comunicationId);
      if (result) {
        alert("Communication deleted successfully!");
        setFormData({ ...emptyForm });
        setComunicationData(null);
        setComunicationId(null);
        setPreviewData({ ...emptyForm });
        setSavedData({ ...emptyForm });
      }
    }
  };

  return (
    <div className="w-full h-screen bg-blue-950 overflow-auto">
      <div className="w-full max-w-3xl mx-auto p-6 h-screen">
        <div className="text-center mb-6 flex gap-4 justify-center flex-wrap">
          <button
            type="button"
            onClick={() => {
              setFormData({ ...emptyForm });
              setPreviewData({ ...emptyForm });
              setIsEditMode(false);
              setComunicationId(null);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            + Create New
          </button>

          {comunicationData && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Edit Communication
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Delete Communication
              </button>
            </>
          )}
        </div>

        <form
          onSubmit={submitComunication}
          className="space-y-4 bg-white p-6 rounded-xl shadow-md"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Heading
            </label>
            <input
              type="text"
              value={formData.heading || ""}
              onChange={(e) => handleFieldChange("heading", e.target.value)}
              placeholder="Enter heading"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Main Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Main Image
            </label>
            <input
              type="text"
              value={formData.mainimg || ""}
              onChange={(e) => handleFieldChange("mainimg", e.target.value)}
              placeholder="Enter main image URL"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Description 1 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description 1
            </label>
            <input
              type="text"
              value={formData.description1 || ""}
              onChange={(e) =>
                handleFieldChange("description1", e.target.value)
              }
              placeholder="Enter description 1"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Description 2 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description 2
            </label>
            <input
              type="text"
              value={formData.description2 || ""}
              onChange={(e) =>
                handleFieldChange("description2", e.target.value)
              }
              placeholder="Enter description 2"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Description 3 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description 3
            </label>
            <input
              type="text"
              value={formData.description3 || ""}
              onChange={(e) =>
                handleFieldChange("description3", e.target.value)
              }
              placeholder="Enter description 3"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Description 4 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description 4
            </label>
            <input
              type="text"
              value={formData.description4 || ""}
              onChange={(e) =>
                handleFieldChange("description4", e.target.value)
              }
              placeholder="Enter description 4"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-[30%] bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isEditMode ? "Update Communication" : "Save Communication"}
          </button>
        </form>

        {/* Live Preview */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
            {previewData.heading || savedData.heading}
          </h3>

          {(previewData.mainimg || savedData.mainimg) && (
            <img
              src={previewData.mainimg || savedData.mainimg}
              alt="Communication Preview"
              className="w-full rounded-lg mb-4"
            />
          )}

          <div className="space-y-3">
            <p className="text-gray-700">
              {previewData.description1 || savedData.description1}
            </p>
            <p className="text-gray-700">
              {previewData.description2 || savedData.description2}
            </p>
            <p className="text-gray-700">
              {previewData.description3 || savedData.description3}
            </p>
            <p className="text-gray-700">
              {previewData.description4 || savedData.description4}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationForm;
