"use client";
import { AppContext } from "@/Context/appcontext";
import React, { useContext, useEffect, useState } from "react";

const HeroSectionAdmin = () => {
  const { gethero, createhero, updatehero, deletehero } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    heading: "",
    paragraph: "",
    image1: "",
    image2: "",
    mainimg: "",
    copyright: "",
  });

  const [heroData, setHeroData] = useState(null);
  const [heroId, setHeroId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const loadData = async () => {
  const res = await gethero();
  if (res) {
    setHeroData(res);
    setHeroId(res._id);
    return res; 
  } else {
    setHeroData(null);
    setHeroId(null);
    return null;
  }
};


  useEffect(() => {
    loadData();
  }, []);

  const submitHero = async (e) => {
  e.preventDefault();

  try {
    const finalData = {
      heading: formData.heading,
      paragraph: formData.paragraph,
      image1: formData.image1,
      image2: formData.image2,
      mainimg: formData.mainimg,
      copyright: formData.copyright,
    };

    let result;

    if (heroId && isEditMode) {
      result = await updatehero(heroId, finalData);
      if (result) {
        alert(" Hero Updated Successfully!");
        setIsEditMode(false);
      }
    } else {
      result = await createhero(finalData);
      if (result) {
        alert(" Hero Created Successfully!");
      }
    }

    const newHero = await loadData();

    setFormData({
      heading: "",
      paragraph: "",
      image1: "",
      image2: "",
      mainimg: "",
      copyright: "",
    });

    if (newHero) setHeroData(newHero);

  } catch (error) {
    console.error("Error submitting hero:", error);
    alert(" Something went wrong!");
  }
};

 const handleEdit = () => {
  if (heroData) {
    console.log("Editing hero:", heroData);
    setFormData({
      
      heading: heroData.heading,
      paragraph: heroData.paragraph,
      image1: heroData.image1,
      image2: heroData.image2,
      mainimg: heroData.mainimg,
      copyright: heroData.copyright,
    });
    setHeroId(heroData._id); 
    setIsEditMode(true);
  }
};

  const handleDelete = async () => {
    if (heroData && confirm("Are you sure you want to delete this hero section?")) {
      const result = await deletehero(heroId);
      if (result) {
        alert("🗑 " + result.message);
        setHeroData(null);
        setHeroId(null);
        setFormData({
          heading: "",
          paragraph: "",
          image1: "",
          image2: "",
          mainimg: "",
          copyright: "",
        });
        await loadData();
      }
    }
  };

  const updateHeroField = (field, value) => {
    if (
      ["heading", "paragraph", "image1", "image2", "mainimg", "copyright"].includes(
        field
      )
    ) {
      setFormData({
        ...formData,
        [field]: value,
      });
    } else {
      console.warn(`Invalid field: ${field}`);
    }
  };

  return (
    <div className="w-full h-screen bg-blue-950 overflow-auto">
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="text-center mb-6 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              setIsEditMode(false);
              setFormData({
                heading: "",
                paragraph: "",
                image1: "",
                image2: "",
                mainimg: "",
                copyright: "",
              });
              setHeroId(null);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            + Create New Hero Section
          </button>

          {heroData && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
              >
                Edit Hero Section
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
              >
                Delete Hero Section
              </button>
            </>
          )}
        </div>

        <form
          onSubmit={submitHero}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Main Heading
            </label>
            <input
              type="text"
              name="heading"
              value={formData?.heading}
              onChange={(e) => updateHeroField("heading", e.target.value)}
              placeholder="Enter main heading"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Paragraph
            </label>
            <textarea
              name="paragraph"
              value={formData?.paragraph}
              onChange={(e) => updateHeroField("paragraph", e.target.value)}
              placeholder="Enter paragraph text"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Image 1 URL
              </label>
              <input
                type="text"
                name="image1"
                value={formData?.image1}
                onChange={(e) => updateHeroField("image1", e.target.value)}
                placeholder="https://example.com/image1.jpg"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Image 2 URL
              </label>
              <input
                type="text"
                name="image2"
                value={formData?.image2}
                onChange={(e) => updateHeroField("image2", e.target.value)}
                placeholder="https://example.com/image2.jpg"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Main Image URL
            </label>
            <input
              type="text"
              name="mainimg"
              value={formData?.mainimg}
              onChange={(e) => updateHeroField("mainimg", e.target.value)}
              placeholder="https://example.com/main-image.jpg"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Copyright
            </label>
            <input
              type="text"
              name="copyright"
              value={formData?.copyright}
              onChange={(e) => updateHeroField("copyright", e.target.value)}
              placeholder="© 2025 Your Company"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-[30%] bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Hero Section
          </button>
        </form>

        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Preview:</h3>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700">
            {heroData?.heading}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            {heroData?.paragraph}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {heroData?.image1 && (
              <img
                src={heroData?.image1}
                alt="Image 1"
                className="w-full sm:w-40 h-40 object-cover rounded-lg border"
              />
            )}
            {heroData?.image2 && (
              <img
                src={heroData?.image2}
                alt="Image 2"
                className="w-full sm:w-40 h-40 object-cover rounded-lg border"
              />
            )}
          </div>

          {heroData?.mainimg && (
            <div className="mt-4">
              <img
                src={heroData?.mainimg}
                alt="Main Hero"
                className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg"
              />
            </div>
          )}

          {heroData?.copyright && (
            <p className="text-xs text-gray-500 mt-4 text-center sm:text-left">
              {heroData?.copyright}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSectionAdmin;
