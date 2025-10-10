"use client";

import { AppContext } from "@/Context/appcontext";
import React, { useContext, useEffect, useState } from "react";

const PricingForm = () => {
  const { getpricing, createpricing, updatepricing, deletepricing } =
    useContext(AppContext);

  const emptyForm = {
    heading:"",
    paragraph:"",
    copyrighttext:"",
    maintext1: "",
    price1: "",
    card1smalltext1: "",
    card1smalltext2: "",
    card1smalltext3: "",
    card1smalltext4: "",
    buttontext1: "",
    maintext2: "",
    price2: "",
    card2smalltext1: "",
    card2smalltext2: "",
    card2smalltext3: "",
    card2smalltext4: "",
    buttontext2: "",
  };

  const [formData, setFormData] = useState({ ...emptyForm });
  const [previewData, setPreviewData] = useState({ ...emptyForm });
  const [savedData, setSavedData] = useState({ ...emptyForm });
  const [isEditMode, setIsEditMode] = useState(false);
  const [pricingId, setpricingId] = useState(null);
  const [pricingData, setpricingData] = useState(null);

  const loadData = async () => {
    const res = await getpricing();
    if (res) {
      setpricingData(res);
      setpricingId(res._id);
      setPreviewData(res);
    } else {
      setpricingData(null);
      setpricingId(null);
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

  const submitpricing = async (e) => {
  e.preventDefault();
  try {
    const finalData = { ...formData };

    if (isEditMode && pricingId) {
      const result = await updatepricing(pricingId, finalData);
      if (result) {
        alert("Pricing updated successfully!");
        setIsEditMode(false);
        setSavedData(result);
      }
    } else {
      const result = await createpricing(finalData);
      if (result) {
        console.log(result);
        alert("Pricing created successfully!");
        setSavedData(result);
        setpricingId(result._id); 
      }
    }

    await loadData();
    setFormData({ ...emptyForm });
    setPreviewData({ ...emptyForm });
  } catch (error) {
    console.error("Error submitting pricing:", error);
    alert("Something went wrong!");
  }
};



  const handleEdit =  () =>{
    if (pricingData) {
      setFormData({ ...pricingData });
      setIsEditMode(true);
      setpricingId(pricingData._id);
      setPreviewData({ ...pricingData });
    }
  };

  const handleDelete = async () =>{
    if (!pricingId) {
      alert("No pricing section selected to delete!");
      return;
    }
     if (confirm("Are you sure you want to delete the pricing section?"));
    {
      const result = await deletepricing(pricingId);
      if (result) {
        alert("pricing deleted successfully!");
        setFormData({ ...emptyForm });
        setpricingData(null);
        setpricingId(null);
        setPreviewData({ ...emptyForm });
        setSavedData({ ...emptyForm });
      };
    };
  };



  return (
    <div className="w-full h-screen bg-blue-950 overflow-auto">
      <div className="w-full max-w-3xl mx-auto p-6 h-screen ">
        <div className="text-center mb-6 flex gap-4 justify-center flex-wrap">
          <button 
          type="button"
            onClick={() => {
              setFormData({ ...emptyForm });
              setPreviewData({ ...emptyForm });
              setIsEditMode(false);
              setpricingId(null);
            }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            + Create New Pricing
          </button>
          {pricingData && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Edit pricing
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Delete pricing 
              </button>
            </>
          )}

        </div>

        <form 
        onSubmit={submitpricing} 
        className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
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
            <textarea
              value={formData.paragraph || ""}
              onChange={(e) => handleFieldChange("paragraph", e.target.value)}
              placeholder="Enter paragraph"
              rows="2"
              className="w-full p-3 border border-gray-300 rounded-lg"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              copywrite
            </label>
            <input
              type="copywrite"
              value={formData.copyrighttext || ""}
              onChange={(e) => handleFieldChange("copyrighttext", e.target.value)}
              placeholder="Enter copywrite"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Card 1</h4>
              <input
                type="text"
                value={formData.maintext1 || ""}
              onChange={(e) => handleFieldChange("maintext1", e.target.value)}
                placeholder="Enter main text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="price"
                value={formData.price1 || ""}
              onChange={(e) => handleFieldChange("price1", e.target.value)}
                placeholder="Enter price"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="text1"
                value={formData.card1smalltext1 || ""}
              onChange={(e) => handleFieldChange("card1smalltext1", e.target.value)}
                placeholder="Enter small text1"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="text2"
                value={formData.card1smalltext2 || ""}
              onChange={(e) => handleFieldChange("card1smalltext2", e.target.value)}
                placeholder="Enter small text2"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="text3"
                value={formData.card1smalltext3 || ""}
              onChange={(e) => handleFieldChange("card1smalltext3", e.target.value)}
                placeholder="Enter small text3"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="text4"
                 value={formData.card1smalltext4 || ""}
              onChange={(e) => handleFieldChange("card1smalltext4", e.target.value)}
                placeholder="Enter small text4"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="text"
                 value={formData.buttontext1 || ""}
              onChange={(e) => handleFieldChange("buttontext1", e.target.value)}
                placeholder="Enter button text"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">Card 2</h4>
              <input
                type="text"
                value={formData.maintext2 || ""}
              onChange={(e) => handleFieldChange("maintext2", e.target.value)}
                placeholder="Enter main text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="price"
                value={formData.price2 || ""}
              onChange={(e) => handleFieldChange("price2", e.target.value)}
                placeholder="Enter main price"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="text1"
                 value={formData.card2smalltext1 || ""}
              onChange={(e) => handleFieldChange("card2smalltext1", e.target.value)}
                placeholder="Enter small text1"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="text2"
                value={formData.card2smalltext2 || ""}
              onChange={(e) => handleFieldChange("card2smalltext2", e.target.value)}
                placeholder="Enter small text2"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="text3"
                value={formData.card2smalltext3 || ""}
              onChange={(e) => handleFieldChange("card2smalltext3", e.target.value)}
                placeholder="Enter small text3"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="text4"
                value={formData.card2smalltext4 || ""}
              onChange={(e) => handleFieldChange("card2smalltext4", e.target.value)}
                placeholder="Enter small text4"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />

              <input
                type="text"
                value={formData.buttontext2 || ""}
              onChange={(e) => handleFieldChange("buttontext2", e.target.value)}
                placeholder="Enter button text"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-[30%] bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
        {/* Live Preview */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
            {previewData.heading || savedData.heading}
          </h3>

          <p className="text-gray-700">
              {previewData.paragraph || savedData.paragraph}
            </p>

            <p className="text-gray-700">
              {previewData.copyrighttext || savedData.copyrighttext}
            </p>

          <div className="space-y-3">
            <p className="text-gray-700">
              {previewData.maintext1 || savedData.maintext1}
            </p>
            <p className="text-gray-700">
              {previewData.price1 || savedData.price1}
            </p>
            <p className="text-gray-700">
              {previewData.card1smalltext1 || savedData.card1smalltext1}
            </p>
            <p className="text-gray-700">
              {previewData.card1smalltext2 || savedData.card1smalltext2}
            </p>
            <p className="text-gray-700">
              {previewData.card1smalltext3 || savedData.card1smalltext3}
            </p>
            <p className="text-gray-700">
              {previewData.card1smalltext4 || savedData.card1smalltext4}
            </p>
            <p className="text-gray-700">
              {previewData.buttontext1 || savedData.buttontext1}
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-gray-700">
              {previewData.maintext2 || savedData.maintext2}
            </p>
            <p className="text-gray-700">
              {previewData.price2 || savedData.price2}
            </p>
            <p className="text-gray-700">
              {previewData.card2smalltext1 || savedData.card2smalltext1}
            </p>
            <p className="text-gray-700">
              {previewData.card2smalltext2 || savedData.card2smalltext2}
            </p>
            <p className="text-gray-700">
              {previewData.card2smalltext3 || savedData.card2smalltext3}
            </p>
            <p className="text-gray-700">
              {previewData.card2smalltext4 || savedData.card2smalltext4}
            </p>
            <p className="text-gray-700">
              {previewData.buttontext2 || savedData.buttontext2}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingForm;
