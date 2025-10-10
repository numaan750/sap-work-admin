"use client";

import { AppContext } from "@/Context/appcontext";
import React, { useContext, useEffect, useState } from "react";

const InterfaceForm = () => {
  const { getinterface, createinterface, updateinterface, deleteinterface } =
    useContext(AppContext);

  const emptyForm = {
    toptext: "",
    heading: "",
    paragraph: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
  };

  const [formData, setFormData] = useState({ ...emptyForm });
  const [isEditMode, setIsEditMode] = useState(false);
  const [interfaceId, setInterfaceId] = useState(null);
  const [previewData, setPreviewData] = useState({ ...emptyForm });
  const [interfaceData, setInterfaceData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getinterface();
      if (res) {
        setInterfaceData(res);
        setInterfaceId(res._id);
        setPreviewData(res);
      } else {
        setInterfaceData(null);
        setInterfaceId(null);
        setPreviewData({ ...emptyForm });
      }
    } catch (error) {
      console.error("Error loading interface:", error);
    }
  };

  const handleFieldChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    setPreviewData(updatedData);
  };

  const submitInterface = async (e) => {
    e.preventDefault();
    try {
      const finalData = { ...formData };

      if (interfaceId && isEditMode) {
        const result = await updateinterface(interfaceId, finalData);
        if (result) {
          alert("Interface updated successfully!");
          setIsEditMode(false);
        }
      } else {
        const result = await createinterface(finalData);
        if (result) {
          alert("Interface created successfully!");
        }
      }

      await loadData();

      setFormData({ ...emptyForm });
    } catch (error) {
      console.error("Error submitting interface:", error);
      alert("Something went wrong!");
    }
  };

  const handleEdit = () => {
    if (interfaceData) {
      setFormData({ ...interfaceData });
      setIsEditMode(true);
      setInterfaceId(interfaceData._id);
      setPreviewData({ ...interfaceData });
    }
  };

  const handleDelete = async () => {
    if (!interfaceId) {
      alert("No interface selected to delete!");
      return;
    }

    const confirmed = confirm("Are you sure you want to delete this section?");
    if (confirmed) {
      const result = await deleteinterface(interfaceId);
      if (result) {
        alert("Interface deleted successfully!");
        setFormData({ ...emptyForm });
        setInterfaceData(null);
        setInterfaceId(null);
        setPreviewData({ ...emptyForm });
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-950 overflow-auto p-8 text-white">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 items-center">
        <div className="text-center mb-3 flex gap-4 justify-center flex-wrap">
          <button
            type="button"
            onClick={() => {
              setFormData({ ...emptyForm });
              setPreviewData({ ...emptyForm });
              setIsEditMode(false);
              setInterfaceId(null);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            + Create New Interface
          </button>

          {interfaceData && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Edit Interface
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Delete Interface
              </button>
            </>
          )}
        </div>
        <div className="w-full bg-white text-black p-6 rounded-xl shadow-md">
          <form onSubmit={submitInterface} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Top Text
              </label>
              <input
                type="text"
                value={formData.toptext}
                onChange={(e) => handleFieldChange("toptext", e.target.value)}
                placeholder="Enter top text"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

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
              <textarea
                value={formData.paragraph}
                onChange={(e) => handleFieldChange("paragraph", e.target.value)}
                rows="3"
                placeholder="Enter paragraph"
                className="w-full p-3 border border-gray-300 rounded-lg"
              ></textarea>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Interface Images
              </h3>

              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Image 1
                </label>
                <input
                  type="text"
                  value={formData.img1}
                  onChange={(e) => handleFieldChange("img1", e.target.value)}
                  placeholder="Enter image 1 URL"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Image 2
                </label>
                <input
                  type="text"
                  value={formData.img2}
                  onChange={(e) => handleFieldChange("img2", e.target.value)}
                  placeholder="Enter image 2 URL"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Image 3
                </label>
                <input
                  type="text"
                  value={formData.img3}
                  onChange={(e) => handleFieldChange("img3", e.target.value)}
                  placeholder="Enter image 3 URL"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Image 4
                </label>
                <input
                  type="text"
                  value={formData.img4}
                  onChange={(e) => handleFieldChange("img4", e.target.value)}
                  placeholder="Enter image 4 URL"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Image 5
                </label>
                <input
                  type="text"
                  value={formData.img5}
                  onChange={(e) => handleFieldChange("img5", e.target.value)}
                  placeholder="Enter image 5 URL"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-[30%] bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {isEditMode ? "Update Interface" : "Save Interface"}
            </button>
          </form>
        </div>

        <div className="w-full bg-white text-gray-900 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">
            Live Preview
          </h2>

          <div className="text-center">
            <p className="text-sm text-gray-500">{previewData.toptext}</p>
            <h3 className="text-2xl font-bold mt-2">{previewData.heading}</h3>
            <p className="mt-3 text-gray-700">{previewData.paragraph}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
            {previewData.img1 && (
              <img
                src={previewData.img1}
                alt="Preview 1"
                className="w-full h-32 object-cover rounded-lg border"
              />
            )}
            {previewData.img2 && (
              <img
                src={previewData.img2}
                alt="Preview 2"
                className="w-full h-32 object-cover rounded-lg border"
              />
            )}
            {previewData.img3 && (
              <img
                src={previewData.img3}
                alt="Preview 3"
                className="w-full h-32 object-cover rounded-lg border"
              />
            )}
            {previewData.img4 && (
              <img
                src={previewData.img4}
                alt="Preview 4"
                className="w-full h-32 object-cover rounded-lg border"
              />
            )}
            {previewData.img5 && (
              <img
                src={previewData.img5}
                alt="Preview 5"
                className="w-full h-32 object-cover rounded-lg border"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfaceForm;
