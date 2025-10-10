"use client";
import { AppContext } from "@/Context/appcontext";
import React, { useContext, useState, useEffect } from "react";

const Stateform = () => {
  const { createstate, getstate, updatestate, deletestate } =
    useContext(AppContext);

  const emptyForm = {
    usersCount: "",
    usersTitle: "",
    downloadsCount: "",
    downloadsTitle: "",
    customersCount: "",
    customersTitle: "",
    developersCount: "",
    developersTitle: "",
  };

  const [formData, setFormData] = useState({ ...emptyForm });
  const [stateData, setStateData] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [previewData, setPreviewData] = useState({ ...emptyForm }); // Live preview

  // Load state data from backend
  const loadData = async () => {
    const res = await getstate();
    if (res) {
      setStateData(res);
      setStateId(res._id);
      setPreviewData(res); // show saved data in preview
    } else {
      setStateData(null);
      setStateId(null);
      setPreviewData({ ...emptyForm });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update single field in formData
  const updateStateField = (field, value) => {
    const validFields = Object.keys(emptyForm);
    if (validFields.includes(field)) {
      setFormData((prevData) => {
        const updated = { ...prevData, [field]: value };
        setPreviewData(updated); // update live preview
        return updated;
      });
    } else {
      console.warn(`Invalid field: ${field}`);
    }
  };

  // Submit state (create / update)
  const submitState = async (e) => {
    e.preventDefault();

    try {
      const finalData = { ...formData };

      if (stateId && isEditMode) {
        const result = await updatestate(stateId, finalData);
        if (result) {
          alert("State Updated Successfully!");
          setIsEditMode(false);
        }
      } else {
        const result = await createstate(finalData);
        if (result) {
          alert("State Created Successfully!");
        }
      }

      // Reload saved data for preview
      await loadData();

      // Reset form to empty after save
      setFormData({ ...emptyForm });
    } catch (error) {
      console.error("Error submitting state:", error);
      alert("Something went wrong!");
    }
  };

  // Edit state
  const handleEdit = () => {
    if (stateData) {
      setFormData({ ...stateData });
      setPreviewData({ ...stateData }); // live preview shows the data
      setStateId(stateData._id);
      setIsEditMode(true);
    }
  };

  // Delete state
  const handleDelete = async () => {
    if (stateData && confirm("Are you sure you want to delete this state section?")) {
      const result = await deletestate(stateId);
      if (result) {
        alert("State Deleted Successfully!");
        setStateData(null);
        setStateId(null);
        setFormData({ ...emptyForm });
        setPreviewData({ ...emptyForm });
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-950 overflow-auto py-6">
      <div className="w-full max-w-5xl mx-auto p-4">
        {/* Buttons */}
        <div className="text-center mb-6 flex justify-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => {
              setFormData({ ...emptyForm });
              setPreviewData({ ...emptyForm });
              setStateId(null);
              setIsEditMode(false);
            }}
            className="bg-blue-600 text-white px-7 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            + Create New State
          </button>

          {stateData && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
              >
                Edit State Section
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
              >
                Delete State Section
              </button>
            </>
          )}
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <form onSubmit={submitState} className="space-y-4">
            {Object.keys(emptyForm).map((key) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                </label>
                <input
                  type="text"
                  value={formData[key]}
                  onChange={(e) => updateStateField(key, e.target.value)}
                  placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-[30%] bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Save State
            </button>
          </form>
        </div>

        {/* Live Preview */}
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md mt-6">
          <h3 className="text-xl font-bold mb-4">Preview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <h4 className="font-bold">{previewData.usersCount}</h4>
              <p>{previewData.usersTitle}</p>
            </div>
            <div>
              <h4 className="font-bold">{previewData.downloadsCount}</h4>
              <p>{previewData.downloadsTitle}</p>
            </div>
            <div>
              <h4 className="font-bold">{previewData.customersCount}</h4>
              <p>{previewData.customersTitle}</p>
            </div>
            <div>
              <h4 className="font-bold">{previewData.developersCount}</h4>
              <p>{previewData.developersTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stateform;
