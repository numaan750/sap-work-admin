"use client";

import { AppContext } from "@/Context/appcontext";
import React, { useContext, useEffect, useState } from "react";

const contectusForm = () => {
  const { getcontectus, createcontectus, updatecontectus, deletecontectus } =
    useContext(AppContext);

  const emptyForm = {
    mainheading: "",
    mainparagraph: "",
    heading: "",
    paragraph: "",
    text1: "",
    text2: "",
    text3: "",
  };

  const [contectusData, setcontectusData] = useState(null);
  const [contectusId, setcontectusId] = useState(null);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [previewData, setPreviewData] = useState({ ...emptyForm });
  const [savedData, setSavedData] = useState({ ...emptyForm });
  const [isEditMode, setIsEditMode] = useState(false);

  const loadData = async () => {
    const res = await getcontectus();
    if (res) {
      setcontectusData(res);
      setcontectusId(res._id);
      setPreviewData(res);
    } else {
      setcontectusData(null);
      setcontectusId(null);
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

  const submitcontectus = async (e) => {
    e.preventDefault();
    try {
      const finalData = { ...formData };

      if (contectusData && isEditMode) {
        const result = await updatecontectus(contectusData._id, finalData);
        if (result) {
          alert("contectus updated successfully!");
          setIsEditMode(false);
          setSavedData(result);
        }
      } else {
        const result = await createcontectus(finalData);
        if (result) {
          alert("contectus created successfully!");
          setSavedData(result);
        }
      }

      await loadData();
      setFormData({ ...emptyForm });
      setPreviewData({ ...emptyForm });
    } catch (error) {
      console.error("Error submitting contectus:", error);
      alert("Something went wrong!");
    }
  };

  const handleEdit = () => {
    if (contectusData) {
      setFormData({ ...contectusData });
      setIsEditMode(true);
      setcontectusId(contectusData._id);
      setPreviewData({ ...contectusData });
    }
  };

  const handleDelete = async () => {
  if (!contectusId) {
    alert("No contectus section selected to delete!");
    return;
  }

  if (confirm("Are you sure you want to delete the contectus section?")) {
    const result = await deletecontectus(contectusId);
    if (result) {
      alert("Contectus deleted successfully!");
      setFormData({ ...emptyForm });
      setcontectusData(null);
      setcontectusId(null);
      setPreviewData({ ...emptyForm });
      setSavedData({ ...emptyForm });
    }
  }
};


  return (
    <div className="w-full min-h-screen bg-blue-950 overflow-auto">
      <div className="w-full max-w-3xl mx-auto p-6">
        <div className="text-center mb-6 flex justify-center gap-4 flex-wrap max-w-2xl mx-auto">
          <button
            type="button"
            onClick={() => {
              setFormData({ ...emptyForm });
              setPreviewData({ ...emptyForm });
              setIsEditMode(false);
              setcontectusId(null);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            + Create New Section
          </button>

          {contectusData && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Edit Contact Us
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Delete Contact Us
              </button>
            </>
          )}
        </div>

        <form
          onSubmit={submitcontectus}
          className="max-w-full mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Main Heading
            </label>
            <input
              type="text"
              value={formData.mainheading || ""}
              onChange={(e) => handleFieldChange("mainheading", e.target.value)}
              placeholder="Enter main heading"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Main Paragraph
            </label>
            <input
              type="text"
              value={formData.mainparagraph || ""}
              onChange={(e) =>
                handleFieldChange("mainparagraph", e.target.value)
              }
              placeholder="Enter main paragraph"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Text 1
            </label>
            <input
              type="text"
              value={formData.text1 || ""}
              onChange={(e) => handleFieldChange("text1", e.target.value)}
              placeholder="Enter Text 1"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Text 2
            </label>
            <input
              type="text"
              value={formData.text2 || ""}
              onChange={(e) => handleFieldChange("text2", e.target.value)}
              placeholder="Enter Text 2"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Text 3
            </label>
            <input
              type="text"
              value={formData.text3 || ""}
              onChange={(e) => handleFieldChange("text3", e.target.value)}
              placeholder="Enter Text 3"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-[30%] bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Save Contact
          </button>
        </form>

        <div className="bg-gray-900 text-white mt-8 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-3">
            {previewData.mainheading ||
              savedData.mainheading ||
              "Main Heading Preview"}
          </h2>
          <p className="text-center text-gray-300 mb-6">
            {previewData.mainparagraph ||
              savedData.mainparagraph ||
              "Main paragraph text will appear here."}
          </p>

          <div className="bg-gray-800 p-5 rounded-lg text-center">
            <h3 className="text-2xl font-semibold mb-2">
              {previewData.heading || savedData.heading || "Section Heading"}
            </h3>
            <p className="text-gray-300 mb-4">
              {previewData.paragraph ||
                savedData.paragraph ||
                "Section paragraph preview..."}
            </p>

            <div className="space-y-2">
              <p>{previewData.text1 || savedData.text1 || "Text 1"}</p>
              <p>{previewData.text2 || savedData.text2 || "Text 2"}</p>
              <p>{previewData.text3 || savedData.text3 || "Text 3"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contectusForm;
