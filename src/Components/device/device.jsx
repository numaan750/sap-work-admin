"use client";
import { AppContext } from "@/Context/appcontext";
import React, { useContext, useEffect, useState } from "react";

const DeviceForm = () => {
  const { createdevice, getdevice, updatedevice, deletedevice } =
    useContext(AppContext);

  const emptyForm = {
    heading: "",
    buttontext: "",
    mainimg: "",
    description1: "",
    icon1: "",
    description2: "",
    icon2: "",
    description3: "",
    icon3: "",
    description4: "",
    icon4: "",
  };

  const [formData, setFormData] = useState({ ...emptyForm });
  const [deviceData, setDeviceData] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [previewData, setPreviewData] = useState({ ...emptyForm });
  const [savedData, setSavedData] = useState({ ...emptyForm });

  const loadData = async () => {
    const res = await getdevice();
    if (res) {
      setDeviceData(res);
      setDeviceId(res._id);
      setPreviewData(res);
    } else {
      setDeviceData(null);
      setDeviceId(null);
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

  const submitDevice = async (e) => {
    e.preventDefault();
    try {
      const finalData = { ...formData };

      if (deviceId && isEditMode) {
        const result = await updatedevice(deviceId, finalData);
        if (result) {
          alert("Device updated successfully!");
          setIsEditMode(false);
          setSavedData(result);
        }
      } else {
        const result = await createdevice(finalData);
        if (result) {
          alert("Device created successfully!");
          setSavedData(result);
        }
      }

      await loadData();
      setFormData({ ...emptyForm });
      setPreviewData({ ...emptyForm });
    } catch (error) {
      console.error("Error submitting device:", error);
      alert("Something went wrong!");
    }
  };

  const handleEdit = () => {
    if (deviceData) {
     
      setFormData({ ...deviceData });
      setPreviewData({ ...deviceData });
      setDeviceId(deviceData._id);
      setIsEditMode(true);
    }
  };

  const handleDelete = async () => {
    if (!deviceId) {
      alert("No device selected to delete!");
      return;
    }
    if (confirm("Are you sure you want to delete this device section?")) {
      const result = await deletedevice(deviceId);
      if (result) {
        alert("Device deleted successfully!");
        setDeviceData(null);
        setDeviceId(null);
        setFormData({ ...emptyForm });
        setSavedData({ ...emptyForm });
        setPreviewData({ ...emptyForm });
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
              setIsEditMode(false);
              setFormData({ ...emptyForm });
              setPreviewData({ ...emptyForm });
              setDeviceId(null);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            + Create New Device
            
          </button>

          {deviceData && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Edit Device
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Delete Device
              </button>
            </>
          )}
        </div>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <form onSubmit={submitDevice} className="space-y-4">
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
                Button Text
              </label>
              <input
                type="text"
                value={formData.buttontext}
                onChange={(e) =>
                  handleFieldChange("buttontext", e.target.value)
                }
                placeholder="Enter button text"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Main Image
              </label>
              <input
                type="text"
                value={formData.mainimg}
                onChange={(e) => handleFieldChange("mainimg", e.target.value)}
                placeholder="Enter main image URL"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Paragraph Items
              </h3>
              <div className="space-y-3 mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description 1
                </label>
                <input
                  type="text"
                  value={formData.description1}
                  onChange={(e) =>
                    handleFieldChange("description1", e.target.value)
                  }
                  placeholder="Enter description 1"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Icon 1
                </label>
                <input
                  type="text"
                  value={formData.icon1}
                  onChange={(e) => handleFieldChange("icon1", e.target.value)}
                  placeholder="Enter icon 1"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="space-y-3 mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description 2
                </label>
                <input
                  type="text"
                  value={formData.description2}
                  onChange={(e) =>
                    handleFieldChange("description2", e.target.value)
                  }
                  placeholder="Enter description 2"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Icon 2
                </label>
                <input
                  type="text"
                  value={formData.icon2}
                  onChange={(e) => handleFieldChange("icon2", e.target.value)}
                  placeholder="Enter icon 2"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="space-y-3 mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description 3
                </label>
                <input
                  type="text"
                  value={formData.description3}
                  onChange={(e) =>
                    handleFieldChange("description3", e.target.value)
                  }
                  placeholder="Enter description 3"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Icon 3
                </label>
                <input
                  type="text"
                  value={formData.icon3}
                  onChange={(e) => handleFieldChange("icon3", e.target.value)}
                  placeholder="Enter icon 3"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="space-y-3 mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description 4
                </label>
                <input
                  type="text"
                  value={formData.description4}
                  onChange={(e) =>
                    handleFieldChange("description4", e.target.value)
                  }
                  placeholder="Enter description 4"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Icon 4
                </label>
                <input
                  type="text"
                  value={formData.icon4}
                  onChange={(e) => handleFieldChange("icon4", e.target.value)}
                  placeholder="Enter icon 4"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-[30%] bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {isEditMode ? "Update Device" : "Save Device"}
            </button>
          </form>
        </div>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
            {previewData.heading || savedData.heading}
          </h3>

          {(previewData.mainimg || savedData.mainimg) && (
            <img
              src={previewData.mainimg || savedData.mainimg}
              alt="Device Preview"
              className="w-full rounded-lg mb-4"
            />
          )}

          <div className="text-center mb-6">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
              {previewData.buttontext || savedData.buttontext}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <span>{previewData.icon1 || savedData.icon1}</span>
                {previewData.description1 || savedData.description1}
              </h4>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <span>{previewData.icon2 || savedData.icon2}</span>
                {previewData.description2 || savedData.description2}
              </h4>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <span>{previewData.icon3 || savedData.icon3}</span>
                {previewData.description3 || savedData.description3}
              </h4>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <span>{previewData.icon4 || savedData.icon4}</span>
                {previewData.description4 || savedData.description4}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceForm;
