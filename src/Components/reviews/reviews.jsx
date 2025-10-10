"use client";

import { AppContext } from "@/Context/appcontext";
import React, { useContext, useEffect, useState } from "react";

const ReviewsForm = () => {
  const { getreviews, createreviews, updatereviews, deletereviews } =
    useContext(AppContext);

  const emptyForm = {
    toptext: "",
    heading: "",
    paragraph: "",

    text1: "",
    discription1: "",
    name1: "",
    role1: "",
    img1: "",

    text2: "",
    discription2: "",
    name2: "",
    role2: "",
    img2: "",

    text3: "",
    discription3: "",
    name3: "",
    role3: "",
    img3: "",
  };

  const [formData, setFormData] = useState({ ...emptyForm });
  const [reviewsData, setreviewsData] = useState(null);
  const [reviewsId, setreviewsId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [previewData, setPreviewData] = useState({ ...emptyForm });
  const [savedData, setSavedData] = useState({ ...emptyForm });

  const loadData = async () => {
    const res = await getreviews();
    if (res) {
      console.log("Response from getreviews:", res);
      setreviewsData(res);
      setreviewsId(res._id);
      setPreviewData(res);
    } else {
      setreviewsData(null);
      setreviewsId(null);
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

  const Submitreviews = async (e) => {
  e.preventDefault();
  try {
    const finalData = { ...formData };

    let result;
    if (reviewsId && isEditMode) {
      result = await updatereviews(reviewsId, finalData);
      alert("Reviews updated successfully!");
    } else {
      result = await createreviews(finalData);
      alert("Reviews created successfully!");
    }

    if (result) {
      setSavedData(result);
      await loadData();
      setFormData({ ...emptyForm });
      setPreviewData({ ...emptyForm });
      setIsEditMode(false);
    }
  } catch (error) {
    console.error("Error submitting reviews:", error);
    alert("Something went wrong");
  }
};

  const handleEdit = () => {
    if (reviewsData) {
      setFormData({ ...reviewsData });
      setIsEditMode(true);
      setreviewsId(reviewsData._id);
      setPreviewData({ ...reviewsData });
    }
  };

  const handleDelete = async () => {
  if (!reviewsData) {
    alert("No reviews to delete");
    return;
  }
  if (confirm("Are you sure you want to delete this section?")) {
    const result = await deletereviews(reviewsData._id);
    if (result) {
      alert("Reviews deleted successfully!");
      setFormData({ ...emptyForm });
      setreviewsData(null);
      setreviewsId(null);
      setPreviewData({ ...emptyForm });
      setSavedData({ ...emptyForm });
    }
  }
};


  return (
    <div className="w-full min-h-screen bg-blue-950 text-white overflow-auto">
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="text-center mb-6 flex gap-4 justify-center flex-wrap">
          <button
            type="button"
            onClick={() => {
              setFormData({ ...emptyForm });
              setIsEditMode(false);
              setreviewsId(null);
            }}
            className="bg-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition w-40"
          >
            + Create New
          </button>

          {reviewsData && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="bg-green-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition w-40"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition w-40"
              >
                Delete
              </button>
            </>
          )}
        </div>

        <form
          onSubmit={Submitreviews}
          className="max-w-2xl mx-auto p-6 bg-white text-black shadow-md rounded-lg"
        >
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Top Text</label>
            <input
              type="text"
              value={formData.toptext}
              onChange={(e) => handleFieldChange("toptext", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter top text"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Heading</label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) => handleFieldChange("heading", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter heading"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Paragraph
            </label>
            <textarea
              rows="3"
              value={formData.paragraph}
              onChange={(e) => handleFieldChange("paragraph", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter paragraph"
            ></textarea>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-bold text-gray-800 mb-2">Review Card 1</h3>
            <input
              type="text"
              placeholder="Text"
              value={formData.text1}
              onChange={(e) => handleFieldChange("text1", e.target.value)}
              className="w-full p-2 border mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={formData.discription1}
              onChange={(e) =>
                handleFieldChange("discription1", e.target.value)
              }
              className="w-full p-2 border mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Name"
              value={formData.name1}
              onChange={(e) => handleFieldChange("name1", e.target.value)}
              className="w-full p-2 border mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Role"
              value={formData.role1}
              onChange={(e) => handleFieldChange("role1", e.target.value)}
              className="w-full p-2 border mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.img1}
              onChange={(e) => handleFieldChange("img1", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-bold text-gray-800 mb-2">Review Card 2</h3>
            <input
              type="text"
              placeholder="Text"
              value={formData.text2}
              onChange={(e) => handleFieldChange("text2", e.target.value)}
              className="w-full p-2 border mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={formData.discription2}
              onChange={(e) =>
                handleFieldChange("discription2", e.target.value)
              }
              className="w-full p-2 border mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Name"
              value={formData.name2}
              onChange={(e) => handleFieldChange("name2", e.target.value)}
              className="w-full p-2 border mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Role"
              value={formData.role2}
              onChange={(e) => handleFieldChange("role2", e.target.value)}
              className="w-full p-2 border mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.img2}
              onChange={(e) => handleFieldChange("img2", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-bold text-gray-800 mb-2">Review Card 3</h3>
            <input
              type="text"
              placeholder="Text"
              value={formData.text3}
              onChange={(e) => handleFieldChange("text3", e.target.value)}
              className="w-full p-2 border mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={formData.discription3}
              onChange={(e) =>
                handleFieldChange("discription3", e.target.value)
              }
              className="w-full p-2 border mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Name"
              value={formData.name3}
              onChange={(e) => handleFieldChange("name3", e.target.value)}
              className="w-full p-2 border mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Role"
              value={formData.role3}
              onChange={(e) => handleFieldChange("role3", e.target.value)}
              className="w-full p-2 border mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.img3}
              onChange={(e) => handleFieldChange("img3", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-[30%] bg-blue-600 text-white mt-4 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            {isEditMode ? "Update Reviews" : "Submit Reviews"}
          </button>
        </form>

        <div className="mt-10 bg-white text-black p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Live Preview</h2>

          <h3 className="text-center text-blue-600 font-semibold">
            {previewData.toptext || savedData.toptext}
          </h3>
          <h1 className="text-center text-3xl font-bold">
            {previewData.heading || savedData.heading}
          </h1>
          <p className="text-center mb-6">{previewData.paragraph || savedData.paragraph}</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4 text-center shadow-sm">
              {formData?.img1 ? (
                <img
                  src={previewData.img1 || savedData.img1}
                  alt="review1"
                  className="w-20 h-20 mx-auto rounded-full mb-3 object-cover"
                />
              ) : (
                <div className="w-20 h-20 mx-auto rounded-full mb-3 bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <p className="italic mb-2">{previewData.text1 || savedData.text1}</p>
              <p className="text-gray-700 mb-2">{previewData.discription1 || savedData.discription1}</p>
              <h4 className="font-bold">{previewData.name1 || savedData.name1}</h4>
              <p className="text-sm text-gray-500">{previewData.role1 || savedData.role1}</p>
            </div>

            <div className="border rounded-lg p-4 text-center shadow-sm">
              {formData?.img2 ? (
                <img
                  src={previewData.img2 || savedData.img2}
                  alt="review2"
                  className="w-20 h-20 mx-auto rounded-full mb-3 object-cover"
                />
              ) : (
                <div className="w-20 h-20 mx-auto rounded-full mb-3 bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <p className="italic mb-2">{previewData.text2|| savedData.text2}</p>
              <p className="text-gray-700 mb-2">{previewData.discription2 || savedData.discription2}</p>
              <h4 className="font-bold">{previewData.name2 || savedData.name2}</h4>
              <p className="text-sm text-gray-500">{previewData.role2 || savedData.role2}</p>
            </div>

            <div className="border rounded-lg p-4 text-center shadow-sm">
              {formData?.img3 ? (
                <img
                  src={previewData.img3 || savedData.img3}
                  alt="review3"
                  className="w-20 h-20 mx-auto rounded-full mb-3 object-cover"
                />
              ) : (
                <div className="w-20 h-20 mx-auto rounded-full mb-3 bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <p className="italic mb-2">{previewData.text3 || savedData.text3}</p>
              <p className="text-gray-700 mb-2">{previewData.discription3 || savedData.discription3}</p>
              <h4 className="font-bold">{previewData.name3 || savedData.name3}</h4>
              <p className="text-sm text-gray-500">{previewData.role3 || savedData.role3}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsForm;
