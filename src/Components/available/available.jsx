"use client";

import { AppContext } from "@/Context/appcontext";
import React, { useContext, useEffect, useState } from "react";

const AvailableForm = () => {
  const { getavailable, createavailable, updateavailable, deleteavailable } =
    useContext(AppContext);

  const emptyForm = {
    backgroundimg: "",
    heading: "",
    paragraph: "",
    img1: "",
    img2: "",
    copywrite: "",
  };

  const [savedData, setSavedData] = useState({ ...emptyForm });
  const [formData, setFormData] = useState({ ...emptyForm });
  const [isEditMode, setIsEditMode] = useState(false);
  const [previewData, setPreviewData] = useState({ ...emptyForm });
  const [availableData, setavailableData] = useState(null);
  const [availableId, setavailableId] = useState(null);

  const loadData = async () => {
    const res = await getavailable();
    if (res) {
      setavailableData(res);
      setavailableId(res._id);
      setPreviewData(res);
    } else {
      setavailableData(null);
      setavailableId(null);
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

  const submitavailable = async (e) => {
    e.preventDefault();
    try {
      const finalData = { ...formData };

      let result;
      if (availableData && isEditMode && availableData._id) {
        result = await updateavailable(availableData._id, finalData);
        alert("Available updated successfully!");
      } else {
        result = await createavailable(finalData);
        alert("Available created successfully!");
      }

      // Reload fresh data before clearing form
      await loadData();

      // Delay clearing to ensure UI updates first
      setTimeout(() => {
        setFormData({ ...emptyForm });
        setPreviewData({ ...emptyForm });
        setIsEditMode(false);
        setSavedData(result);
      }, 300);
    } catch (error) {
      console.error("Error submitting available:", error);
      alert("Something went wrong!");
    }
  };

  const handleEdit = () => {
    if (availableData) {
      setFormData({ ...availableData });
      setIsEditMode(true);
      setavailableData(availableData._id);
      setPreviewData({ ...availableData });
    }
  };

  const handleDelete = async () => {
    if (!availableId) {
      alert("No available section selected to delete!");
      return;
    }

    if (confirm("Are you sure you want to delete the available section?"));
    {
      const result = await deleteavailable(availableId);
      if (result) {
        alert("available deleted successfully!");
        setFormData({ ...emptyForm });
        setavailableData(null);
        setavailableId(null);
        setPreviewData({ ...emptyForm });
        setSavedData({ ...emptyForm });
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-950 overflow-auto p-6 text-white">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <div className="text-center flex gap-4 justify-center flex-wrap">
          <button
            type="button"
            onClick={() => {
              setFormData({ ...emptyForm });
              setPreviewData({ ...emptyForm });
              setIsEditMode(false);
              setavailableId(null);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            + Create New Section
          </button>

          {availableData && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
              >
                Edit Available
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
              >
                Delete Available
              </button>
            </>
          )}
        </div>

        <form
          onSubmit={submitavailable}
          className="max-w-3xl mx-auto bg-white text-black p-6 rounded-xl shadow-md space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold mb-1">
              Main Image
            </label>
            <input
              type="text"
              value={formData.backgroundimg || ""}
              onChange={(e) =>
                handleFieldChange("backgroundimg", e.target.value)
              }
              placeholder="Enter main image URL"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Heading</label>
            <input
              type="text"
              value={formData.heading || ""}
              onChange={(e) => handleFieldChange("heading", e.target.value)}
              placeholder="Enter heading"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Paragraph
            </label>
            <input
              type="text"
              value={formData.paragraph || ""}
              onChange={(e) => handleFieldChange("paragraph", e.target.value)}
              placeholder="Enter paragraph"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Image 1</label>
            <input
              type="text"
              value={formData.img1 || ""}
              onChange={(e) => handleFieldChange("img1", e.target.value)}
              placeholder="Enter image 1 URL"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Image 2</label>
            <input
              type="text"
              value={formData.img2 || ""}
              onChange={(e) => handleFieldChange("img2", e.target.value)}
              placeholder="Enter image 2 URL"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Copyright
            </label>
            <input
              type="text"
              value={formData.copywrite || ""}
              onChange={(e) => handleFieldChange("copywrite", e.target.value)}
              placeholder="Enter copyright text"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-[30%] bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Save Section
          </button>
        </form>

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-center">
            {previewData.heading || savedData.heading}
          </h2>
          <p className="text-center text-gray-300">
            {previewData.paragraph || savedData.paragraph}
          </p>

          <div
            className="w-full h-64 bg-cover bg-center rounded-xl"
            style={{
              backgroundImage: `url(${
                previewData.backgroundimg || savedData.backgroundimg 
              })`,
            }}
          ></div>

          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <img
              src={previewData.img1 || savedData.img1}
              alt="Image 1"
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src={previewData.img2 || savedData.img2}
              alt="Image 2"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <p className="text-center text-gray-400 mt-4">
            {previewData.copywrite || savedData.copywrite}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvailableForm;
