"use client";

import { AppContext } from "@/Context/appcontext";
import React, { useContext, useEffect, useState } from "react";

const footerForm = () => {
  const { getfooter, createfooter, updatefooter, deletefooter } =
    useContext(AppContext);

  const emptyForm = {
    Logo: "",
    paragraph: "",
    copywritetext: "",

    footerheading1: "",
    footertext1: "",
    footertext2: "",
    footertext3: "",
    footertext4: "",
    footertext5: "",

    footerheading2: "",
    footerdiscription1: "",
    footerdiscription2: "",
    footerdiscription3: "",
    footerdiscription4: "",
    footerdiscription5: "",

    footerheading3: "",
    img1: "",
    img2: "",
  };

  const [formData, setFormData] = useState({ ...emptyForm });
  const [previewData, setPreviewData] = useState({ ...emptyForm });
  const [savedData, setSavedData] = useState({ ...emptyForm });
  const [isEditMode, setIsEditMode] = useState(false);
  const [footerData, setfooterData] = useState(null);
  const [footerId, setfooterId] = useState(null);

  const loadData = async () => {
    const res = await getfooter();
    if (res) {
      setfooterData(res);
      setfooterId(res._id);
      setPreviewData(res);
    } else {
      setfooterData(null);
      setfooterId(null);
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

  const submitfooter = async (e) => {
    e.preventDefault();
    try {
      const finalData = { ...formData };

      if (footerData && isEditMode) {
        const result = await updatefooter(footerData._id, finalData);
        if (result) {
          alert("footer updated successfully!");
          setIsEditMode(false);
          setSavedData(result);
        }
      } else {
        const result = await createfooter(finalData);
        if (result) {
          alert("footer created successfully!");
          setSavedData(result);
        }
      }

      await loadData();
      setFormData({ ...emptyForm });
      setPreviewData({ ...emptyForm });
    } catch (error) {
      console.error("Error submitting footer:", error);
      alert("Something went wrong!");
    }
  };

  const handleEdit = () => {
    if (footerData) {
      setFormData({ ...footerData });
      setIsEditMode(true);
      setfooterId(footerData._id);
      setPreviewData({ ...footerData });
    }
  };

  const handleDelete = async () => {
    if (!footerId) {
      alert("No footer section selected to delete!");
      return;
    }

    if (confirm("Are you sure you want to delete the footer section?")) {
      const result = await deletefooter(footerId);
      if (result) {
        alert("footer deleted successfully!");
        setFormData({ ...emptyForm });
        setfooterData(null);
        setfooterId(null);
        setPreviewData({ ...emptyForm });
        setSavedData({ ...emptyForm });
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-950 overflow-auto">
      <div className="w-full max-w-5xl mx-auto p-4">
        {/* === Buttons === */}
        <div className="text-center mb-6">
          <button
            type="button"
            onClick={() => {
              setFormData({ ...emptyForm });
              setPreviewData({ ...emptyForm });
              setIsEditMode(false);
              setfooterId(null);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            + Create new Footer
          </button>

          {footerData && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="ml-3 flex-1 min-w-[150px] bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
              >
                Edit footer
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="ml-3 flex-1 min-w-[150px] bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
              >
                Delete footer
              </button>
            </>
          )}
        </div>

        {/* === FORM === */}
        <form
          onSubmit={submitfooter}
          className="space-y-4 bg-white p-6 rounded-xl shadow-md"
        >
          {/* Logo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Logo
            </label>
            <input
              type="text"
              value={formData.Logo || ""}
              onChange={(e) => handleFieldChange("Logo", e.target.value)}
              placeholder="Enter logo URL"
              className="w-full p-3 border border-gray-300 mb-1"
            />
          </div>

          {/* Paragraph */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Paragraph
            </label>
            <input
              type="text"
              value={formData.paragraph || ""}
              onChange={(e) => handleFieldChange("paragraph", e.target.value)}
              placeholder="Enter paragraph"
              className="w-full p-3 border border-gray-300 mb-1"
            />
          </div>

          {/* Copywrite */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Copywrite Text
            </label>
            <input
              type="text"
              value={formData.copywritetext || ""}
              onChange={(e) =>
                handleFieldChange("copywritetext", e.target.value)
              }
              placeholder="Enter copywrite text"
              className="w-full p-3 border border-gray-300 mb-1"
            />
          </div>

          {/* FOOTER SECTION 1 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Heading
            </label>
            <input
              type="text"
              value={formData.footerheading1 || ""}
              onChange={(e) =>
                handleFieldChange("footerheading1", e.target.value)
              }
              placeholder="Enter heading"
              className="w-full p-3 border border-gray-300 rounded"
            />

            <label className="block text-sm font-semibold text-gray-700 mb-1 mt-2">
              Text1
            </label>
            <input
              type="text"
              value={formData.footertext1 || ""}
              onChange={(e) => handleFieldChange("footertext1", e.target.value)}
              placeholder="Enter text1"
              className="w-full p-3 border border-gray-300 rounded"
            />

            <label className="block text-sm font-semibold text-gray-700 mb-1 mt-2">
              Text2
            </label>
            <input
              type="text"
              value={formData.footertext2 || ""}
              onChange={(e) => handleFieldChange("footertext2", e.target.value)}
              placeholder="Enter text2"
              className="w-full p-3 border border-gray-300 rounded"
            />

            <label className="block text-sm font-semibold text-gray-700 mb-1 mt-2">
              Text3
            </label>
            <input
              type="text"
              value={formData.footertext3 || ""}
              onChange={(e) => handleFieldChange("footertext3", e.target.value)}
              placeholder="Enter text3"
              className="w-full p-3 border border-gray-300 rounded"
            />

            <label className="block text-sm font-semibold text-gray-700 mb-1 mt-2">
              Text4
            </label>
            <input
              type="text"
              value={formData.footertext4 || ""}
              onChange={(e) => handleFieldChange("footertext4", e.target.value)}
              placeholder="Enter text4"
              className="w-full p-3 border border-gray-300 rounded"
            />

            <label className="block text-sm font-semibold text-gray-700 mb-1 mt-2">
              Text5
            </label>
            <input
              type="text"
              value={formData.footertext5 || ""}
              onChange={(e) => handleFieldChange("footertext5", e.target.value)}
              placeholder="Enter text5"
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          {/* FOOTER SECTION 2 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Heading
            </label>
            <input
              type="text"
              value={formData.footerheading2 || ""}
              onChange={(e) =>
                handleFieldChange("footerheading2", e.target.value)
              }
              placeholder="Enter heading"
              className="w-full p-3 border border-gray-300 rounded"
            />

            <label className="block text-sm font-semibold text-gray-700 mb-1 mt-2">
              Text1
            </label>
            <input
              type="text"
              value={formData.footerdiscription1 || ""}
              onChange={(e) =>
                handleFieldChange("footerdiscription1", e.target.value)
              }
              placeholder="Enter text1"
              className="w-full p-3 border border-gray-300 rounded"
            />

            <label className="block text-sm font-semibold text-gray-700 mb-1 mt-2">
              Text2
            </label>
            <input
              type="text"
              value={formData.footerdiscription2 || ""}
              onChange={(e) =>
                handleFieldChange("footerdiscription2", e.target.value)
              }
              placeholder="Enter text2"
              className="w-full p-3 border border-gray-300 rounded"
            />

            <label className="block text-sm font-semibold text-gray-700 mb-1 mt-2">
              Text3
            </label>
            <input
              type="text"
              value={formData.footerdiscription3 || ""}
              onChange={(e) =>
                handleFieldChange("footerdiscription3", e.target.value)
              }
              placeholder="Enter text3"
              className="w-full p-3 border border-gray-300 rounded"
            />

            <label className="block text-sm font-semibold text-gray-700 mb-1 mt-2">
              Text4
            </label>
            <input
              type="text"
              value={formData.footerdiscription4 || ""}
              onChange={(e) =>
                handleFieldChange("footerdiscription4", e.target.value)
              }
              placeholder="Enter text4"
              className="w-full p-3 border border-gray-300 rounded"
            />

            <label className="block text-sm font-semibold text-gray-700 mb-1 mt-2">
              Text5
            </label>
            <input
              type="text"
              value={formData.footerdiscription5 || ""}
              onChange={(e) =>
                handleFieldChange("footerdiscription5", e.target.value)
              }
              placeholder="Enter text5"
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          {/* FOOTER SECTION 3 */}
          <h3 className="text-lg font-semibold mt-6">Footer Links 3</h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Heading
            </label>
            <input
              type="text"
              value={formData.footerheading3 || ""}
              onChange={(e) =>
                handleFieldChange("footerheading3", e.target.value)
              }
              placeholder="Enter heading"
              className="w-full p-3 border border-gray-300 rounded"
            />
            <label className="block text-sm font-semibold text-gray-700 mb-1 mt-2">
              Image 1
            </label>
            <input
              type="text"
              value={formData.img1 || ""}
              onChange={(e) => handleFieldChange("img1", e.target.value)}
              placeholder="Enter Image 1 URL"
              className="w-full p-3 border border-gray-300 rounded"
            />
            <label className="block text-sm font-semibold text-gray-700 mb-1 mt-2">
              Image 2
            </label>
            <input
              type="text"
              value={formData.img2 || ""}
              onChange={(e) => handleFieldChange("img2", e.target.value)}
              placeholder="Enter Image 2 URL"
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          <button className="w-[30%] bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Save Footer
          </button>
        </form>

        {/* === LIVE PREVIEW === */}
        <div className="bg-gray-100 mt-10 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Live Footer Preview
          </h2>

          <footer className="bg-blue-900 text-white py-10 rounded-xl">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
              {/* Column 1 */}
              <div>
                {formData.Logo && (
                  <img
                    src={previewData.Logo || savedData.Logo || "Logo"}
                    alt="Footer Logo"
                    className="w-32 mb-4"
                  />
                )}
                <p className="text-sm mb-4">{formData.paragraph}</p>
                <p className="text-xs text-gray-300">
                  {previewData.paragraph || savedData.paragraph || "paragraph"}
                </p>
              </div>

              {/* Column 2 */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {previewData.footerheading1 || savedData.footerheading1 || "footerheading1"}
                </h3>
                <ul className="space-y-1 text-sm text-gray-200">
                  <li>{previewData.footertext1 || savedData.footertext1 || "footertext1"}</li>
                  <li>{previewData.footertext2 || savedData.footertext2 || "footertext1"}</li>
                  <li>{previewData.footertext3 || savedData.footertext3 || "footertext3"}</li>
                  <li>{previewData.footertext4 || savedData.footertext4 || "footertext4"}</li>
                  <li>{previewData.footertext5 || savedData.footertext5 || "footertext5"}</li>
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {previewData.footerheading2 || savedData.footerheading2|| "footerheading2"}
                </h3>
                <ul className="space-y-1 text-sm text-gray-200">
                  <li>{previewData.footerdiscription1 || savedData.footerdiscription1 || "footerdiscription1"}</li>
                  <li>{previewData.footerdiscription2 || savedData.footerdiscription2 || "footerdiscription2"}</li>
                  <li>{previewData.footerdiscription3 || savedData.footerdiscription3 || "footerdiscription3"}</li>
                  <li>{previewData.footerdiscription4 || savedData.footerdiscription4 || "footerdiscription4"}</li>
                  <li>{previewData.footerdiscription5 || savedData.footerdiscription5 || "footerdiscription5"}</li>
                </ul>

                <h3 className="text-lg font-semibold mt-4 mb-2">
                  {previewData.footerheading3 || savedData.footerheading3 || "footerheading3"}
                </h3>
                <div className="flex space-x-3">
                  {formData.img1 && (
                    <img
                      src={previewData.img1 || savedData.img1 || "img1"}
                      alt="icon1"
                      className="w-8 h-8 rounded-md"
                    />
                  )}
                  {formData.img2 && (
                    <img
                      src={previewData.img2 || savedData.img2 || "img2"}
                      alt="icon2"
                      className="w-8 h-8 rounded-md"
                    />
                  )}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default footerForm;
