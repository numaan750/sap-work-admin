"use client";

import { AppContext } from "@/Context/appcontext";
import React, { useContext, useEffect, useState } from "react";

const Sapwork = () => {
  const { getsapwork, createsapwork, updatesapwork, deletesapwork } =
    useContext(AppContext);

  const emptyForm = {
    heading: "",
    paragraph: "",
    text1: "",
    description1: "",
    text2: "",
    description2: "",
    text3: "",
    description3: "",
  };

  const [formData, setFormData] = useState({ ...emptyForm });
  const [isEditMode, setIsEditMode] = useState(false);
  const [previewData, setPreviewData] = useState({ ...emptyForm });
  const [savedData, setSavedData] = useState({ ...emptyForm });
  const [sapworkData, setSapworkData] = useState(null);
  const [sapworkId, setSapworkId] = useState(null);

  const loadData = async () => {
    const res = await getsapwork();
    if (res) {
      setSapworkData(res);
      setSapworkId(res._id);
      setPreviewData(res);
    } else {
      setSapworkData(null);
      setSapworkId(null);
      setPreviewData({ ...emptyForm });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFieldChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    setPreviewData(updated);
  };

  const submitSapwork = async (e) => {
    e.preventDefault();
    try {
      const finalData = { ...formData };

      let result;
      if (sapworkId && isEditMode) {
        result = await updatesapwork(sapworkId, finalData);
        console.log(result);
        alert("Updated successfully!");
      } else {
        result = await createsapwork(finalData);
        console.log(result);
        alert("Created successfully!");
      }

      if (result) {
        setSavedData(result);
        setIsEditMode(false);
        await loadData();
        setFormData({ ...emptyForm });
        setPreviewData({ ...emptyForm });
      }
    } catch (error) {
      console.error("Error submitting sapwork:", error);
      alert("Something went wrong!");
    }
  };

  const handleEdit = () => {
    if (sapworkData) {
      setFormData({ ...sapworkData });
      setIsEditMode(true);
      setPreviewData({ ...sapworkData });
      setSapworkId(sapworkData._id);
    }
  };

  const handleDelete = async () => {
    if (!sapworkId) {
      alert("No record to delete!");
      return;
    }
    if (confirm("Are you sure you want to delete this Sapwork section?")) {
      const result = await deletesapwork(sapworkId);
      if (result) {
        alert("Deleted successfully!");
        setFormData({ ...emptyForm });
        setPreviewData({ ...emptyForm });
        setSavedData({ ...emptyForm });
        setSapworkData(null);
        setSapworkId(null);
      }
    }
  };

  const handleCreateNew = () => {
    setFormData({ ...emptyForm });
    setPreviewData({ ...emptyForm });
    setIsEditMode(false);
    setSapworkId(null);
  };

  return (
    <div className="w-full min-h-screen bg-blue-950 overflow-auto py-10">
      <div className="w-full max-w-3xl mx-auto p-6">
        <div className="text-center mb-6 flex gap-4 justify-center flex-wrap">
          <button
            type="button"
            onClick={handleCreateNew}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            + Create Work Section
          </button>

          {sapworkData && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Edit Sapwork
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Delete Sapwork
              </button>
            </>
          )}
        </div>

        <form
          onSubmit={submitSapwork}
          className="space-y-4 bg-white p-6 rounded-xl shadow-md"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Heading
            </label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) => handleFieldChange("heading", e.target.value)}
              placeholder="Enter heading"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Paragraph
            </label>
            <input
              type="text"
              value={formData.paragraph}
              onChange={(e) => handleFieldChange("paragraph", e.target.value)}
              placeholder="Enter paragraph"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Section 1</h3>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Text
            </label>
            <input
              type="text"
              value={formData.text1}
              onChange={(e) => handleFieldChange("text1", e.target.value)}
              placeholder="Enter section 1 text"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <label className="block text-sm font-semibold text-gray-700 mt-2 mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description1}
              onChange={(e) =>
                handleFieldChange("description1", e.target.value)
              }
              placeholder="Enter section 1 description"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Section 2</h3>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Text
            </label>
            <input
              type="text"
              value={formData.text2}
              onChange={(e) => handleFieldChange("text2", e.target.value)}
              placeholder="Enter section 2 text"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <label className="block text-sm font-semibold text-gray-700 mt-2 mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description2}
              onChange={(e) =>
                handleFieldChange("description2", e.target.value)
              }
              placeholder="Enter section 2 description"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Section 3</h3>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Text
            </label>
            <input
              type="text"
              value={formData.text3}
              onChange={(e) => handleFieldChange("text3", e.target.value)}
              placeholder="Enter section 3 text"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <label className="block text-sm font-semibold text-gray-700 mt-2 mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description3}
              onChange={(e) =>
                handleFieldChange("description3", e.target.value)
              }
              placeholder="Enter section 3 description"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-[30%] bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isEditMode ? "Update Sapwork" : "Save Sapwork"}
          </button>
        </form>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
            {previewData.heading || savedData.heading}
          </h3>
          <p className="text-gray-700 text-center mb-4">
            {previewData.paragraph || savedData.paragraph}
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800">
                {previewData.text1 || savedData.text1}
              </h4>
              <p className="text-gray-700">
                {previewData.description1 || savedData.description1}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">
                {previewData.text2 || savedData.text2}
              </h4>
              <p className="text-gray-700">
                {previewData.description2 || savedData.description2}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">
                {previewData.text3 || savedData.text3}
              </h4>
              <p className="text-gray-700">
                {previewData.description3 || savedData.description3}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sapwork;
