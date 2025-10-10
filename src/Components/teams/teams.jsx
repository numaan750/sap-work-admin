"use client";

import { AppContext } from "@/Context/appcontext";
import React, { useContext, useEffect, useState } from "react";

const TeamsForm = () => {
  const { getteams, createteams, updateteams, deleteteams } =
    useContext(AppContext);

  const emptyForm = {
    heading: "",
    paragraph: "",
    image1: "",
    Name1: "",
    role1: "",
    image2: "",
    Name2: "",
    role2: "",
    image3: "",
    Name3: "",
    role3: "",
    image4: "",
    Name4: "",
    role4: "",
  };

  const [formData, setFormData] = useState({ ...emptyForm });
  const [previewData, setPreviewData] = useState({ ...emptyForm });
  const [teamsData, setTeamsData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [teamsId, setTeamsId] = useState(null);
  const [savedData, setSavedData] = useState({ ...emptyForm });

  const loadData = async () => {
    const res = await getteams();
    if (res) {
      setTeamsData(res);
      setTeamsId(res._id);
      setPreviewData(res);
    } else {
      setTeamsData(null);
      setTeamsId(null);
      setPreviewData({ ...emptyForm });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFieldChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    setPreviewData(updatedData);
  };

  const submitTeams = async (e) => {
    e.preventDefault();
    try {
      const finalData = { ...formData };
      let result;
      if (isEditMode && teamsId) {
        result = await updateteams(teamsId, finalData);
        if (result) alert("Teams updated successfully!");
      } else {
        result = await createteams(finalData);
        if (result) alert("Teams created successfully!");
      }
      if (result) {
        setSavedData(result);
        await loadData();
        setFormData({ ...emptyForm });
        setPreviewData({ ...emptyForm });
        setIsEditMode(false);
      }
    } catch (error) {
      console.error("Error submitting teams:", error);
      alert("Something went wrong!");
    }
  };

  const handleEdit = () => {
    if (teamsData) {
      setFormData({ ...teamsData });
      setPreviewData({ ...teamsData });
      setIsEditMode(true);
      setTeamsId(teamsData._id);
    }
  };

  const handleDelete = async () => {
    if (!teamsId) return alert("No team section selected!");
    if (confirm("Are you sure you want to delete this section?")) {
      const result = await deleteteams(teamsId);
      if (result) {
        alert("Teams deleted successfully!");
        setFormData({ ...emptyForm });
        setPreviewData({ ...emptyForm });
        setTeamsData(null);
        setTeamsId(null);
        setSavedData({ ...emptyForm });
      }
    }
  };

  const safeImage = (img) =>
    img && img.trim() !== ""
      ? img
      : "https://placehold.co/150x150?text=No+Image";

  return (
    <div className="w-full min-h-screen bg-blue-950 text-white overflow-auto p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="text-center mb-3 flex gap-4 justify-center flex-wrap">
          <button
            type="button"
            onClick={() => {
              setFormData({ ...emptyForm });
              setPreviewData({ ...emptyForm });
              setIsEditMode(false);
              setTeamsId(null);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            + Create New Team
          </button>

          {teamsData && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Delete
              </button>
            </>
          )}
        </div>

        <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
          <form onSubmit={submitTeams} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Heading
              </label>
              <input
                type="text"
                value={formData.heading}
                onChange={(e) => handleFieldChange("heading", e.target.value)}
                placeholder="Enter heading"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Paragraph
              </label>
              <textarea
                value={formData.paragraph}
                onChange={(e) => handleFieldChange("paragraph", e.target.value)}
                placeholder="Enter paragraph"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Card 1</h4>
              <input
                type="text"
                value={formData.image1}
                onChange={(e) => handleFieldChange("image1", e.target.value)}
                placeholder="Image URL"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <input
                type="text"
                value={formData.Name1}
                onChange={(e) => handleFieldChange("Name1", e.target.value)}
                placeholder="Name"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <input
                type="text"
                value={formData.role1}
                onChange={(e) => handleFieldChange("role1", e.target.value)}
                placeholder="Role"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Card 2</h4>
              <input
                type="text"
                value={formData.image2}
                onChange={(e) => handleFieldChange("image2", e.target.value)}
                placeholder="Image URL"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <input
                type="text"
                value={formData.Name2}
                onChange={(e) => handleFieldChange("Name2", e.target.value)}
                placeholder="Name"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <input
                type="text"
                value={formData.role2}
                onChange={(e) => handleFieldChange("role2", e.target.value)}
                placeholder="Role"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Card 3</h4>
              <input
                type="text"
                value={formData.image3}
                onChange={(e) => handleFieldChange("image3", e.target.value)}
                placeholder="Image URL"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <input
                type="text"
                value={formData.Name3}
                onChange={(e) => handleFieldChange("Name3", e.target.value)}
                placeholder="Name"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <input
                type="text"
                value={formData.role3}
                onChange={(e) => handleFieldChange("role3", e.target.value)}
                placeholder="Role"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Card 4</h4>
              <input
                type="text"
                value={formData.image4}
                onChange={(e) => handleFieldChange("image4", e.target.value)}
                placeholder="Image URL"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <input
                type="text"
                value={formData.Name4}
                onChange={(e) => handleFieldChange("Name4", e.target.value)}
                placeholder="Name"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <input
                type="text"
                value={formData.role4}
                onChange={(e) => handleFieldChange("role4", e.target.value)}
                placeholder="Role"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {isEditMode ? "Update Team" : "Save Team"}
            </button>
          </form>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-3">
            {previewData.heading || savedData.heading}
          </h2>
          <p className="text-center text-gray-300 mb-6">
            {previewData.paragraph || savedData.paragraph}
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="text-center bg-gray-800 p-4 rounded-xl">
              <img
                src={safeImage(previewData.image1 || savedData.image1)}
                alt="Team Member 1"
                className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
              />
              <h3 className="font-semibold text-lg">
                {previewData.Name1 || savedData.Name1}
              </h3>
              <p className="text-gray-400">
                {previewData.role1 || savedData.role1}
              </p>
            </div>

            <div className="text-center bg-gray-800 p-4 rounded-xl">
              <img
                src={safeImage(previewData.image2 || savedData.image2)}
                alt="Team Member 2"
                className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
              />
              <h3 className="font-semibold text-lg">
                {previewData.Name2 || savedData.Name2}
              </h3>
              <p className="text-gray-400">
                {previewData.role2 || savedData.role2}
              </p>
            </div>

            <div className="text-center bg-gray-800 p-4 rounded-xl">
              <img
                src={safeImage(previewData.image3 || savedData.image3)}
                alt="Team Member 3"
                className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
              />
              <h3 className="font-semibold text-lg">
                {previewData.Name3 || savedData.Name3}
              </h3>
              <p className="text-gray-400">
                {previewData.role3 || savedData.role3}
              </p>
            </div>

            <div className="text-center bg-gray-800 p-4 rounded-xl">
              <img
                src={safeImage(previewData.image4 || savedData.image4)}
                alt="Team Member 4"
                className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
              />
              <h3 className="font-semibold text-lg">
                {previewData.Name4 || savedData.Name4}
              </h3>
              <p className="text-gray-400">
                {previewData.role4 || savedData.role4}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsForm;
