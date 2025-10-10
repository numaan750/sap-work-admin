"use client";

import { AppContext } from "@/Context/appcontext";
import React, { useContext, useEffect, useState } from "react";

const NavbarForm = () => {
  const { createNavbar, getNavbar, updateNavbar, deleteNavbar } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    logo: "",
    navLinks: [{ name: "", link: "" }],
  });

  const [navbarData, setNavbarData] = useState(null);
  const [navbarId, setNavbarId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // ✅ Load navbar data from backend
  const loadData = async () => {
    const res = await getNavbar();
    console.log("Loaded data:", res);

    if (res && res._id) {
      setNavbarData(res);
      setNavbarId(res._id);
      console.log("Navbar ID:", res._id);
    } else {
      setNavbarData(null);
      setNavbarId(null);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ Submit (Create or Update)
  const submitNavbar = async (e) => {
    e.preventDefault();
    try {
      // backend expects `navlinks` (not navLinks)
      const finalData = {
        logo: formData.logo,
        navlinks: formData.navLinks,
      };

      if (navbarId && isEditMode) {
        const result = await updateNavbar(navbarId, finalData);
        if (result) {
          alert("✅ Navbar Updated Successfully!");
          setIsEditMode(false);
        }
      } else {
        const result = await createNavbar(finalData);
        if (result) {
          alert("✅ Navbar Created Successfully!");
        }
      }

      await loadData();

      setFormData({
        logo: "",
        navLinks: [{ name: "", link: "" }],
      });
    } catch (error) {
      console.error("Submit error:", error);
      alert("Error saving navbar");
    }
  };

  // ✅ Edit Navbar
  const handleEdit = () => {
    if (navbarData) {
      setFormData({
        logo: navbarData.logo || "",
        navLinks:
          navbarData.navlinks?.length > 0
            ? navbarData.navlinks
            : [{ name: "", link: "" }],
      });
      setIsEditMode(true);
    }
  };

  // ✅ Delete Navbar
  const handleDelete = async () => {
    if (navbarId && confirm("Are you sure you want to delete this navbar?")) {
      const result = await deleteNavbar(navbarId);
      if (result) {
        alert("🗑️ Navbar Deleted Successfully!");
        setNavbarData(null);
        setNavbarId(null);
        setFormData({
          logo: "",
          navLinks: [{ name: "", link: "" }],
        });
        await loadData();
      }
    }
  };

  // ✅ Add / Update / Delete nav links
  const addNavLink = () => {
    setFormData({
      ...formData,
      navLinks: [...formData.navLinks, { name: "", link: "" }],
    });
  };

  const updateNavLinks = (index, field, value) => {
    const updatedLinks = [...formData.navLinks];
    updatedLinks[index][field] = value;
    setFormData({ ...formData, navLinks: updatedLinks });
  };

  const deleteNavLink = (index) => {
    const updatedLinks = formData.navLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, navLinks: updatedLinks });
  };

  return (
    <div className="w-full min-h-screen bg-blue-950 overflow-auto py-8">
      <div className="w-full max-w-3xl mx-auto px-6">
        {/* ===== Top Action Buttons ===== */}
        <div className="flex gap-4 justify-center mb-6">
          <button
            type="button"
            onClick={() => {
              setIsEditMode(false);
              setFormData({
                logo: "",
                navLinks: [{ name: "", link: "" }],
              });
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            + Create New Navbar
          </button>

          {navbarData && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
              >
                Edit Existing
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
              >
                Delete Navbar
              </button>
            </>
          )}
        </div>

        {/* ===== Navbar Form ===== */}
        <form
          onSubmit={submitNavbar}
          className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
        >
          <h2 className="text-2xl font-bold mb-4">
            {isEditMode ? "Edit Navbar" : "Create Navbar"}
          </h2>

          {/* Logo Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Logo Link
            </label>
            <input
              type="text"
              value={formData.logo}
              onChange={(e) =>
                setFormData({ ...formData, logo: e.target.value })
              }
              placeholder="https://example.com/logo.png"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Nav Links */}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold">Navigation Links</h4>
              <button
                type="button"
                onClick={addNavLink}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm"
              >
                + Add Link
              </button>
            </div>

            {formData.navLinks.map((link, index) => (
              <div
                key={index}
                className="mb-4 p-4 border rounded-lg bg-gray-50 space-y-2"
              >
                <input
                  type="text"
                  placeholder="Name (e.g. Home)"
                  value={link.name}
                  onChange={(e) =>
                    updateNavLinks(index, "name", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Link (e.g. /home)"
                  value={link.link}
                  onChange={(e) =>
                    updateNavLinks(index, "link", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                {formData.navLinks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => deleteNavLink(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              {isEditMode ? "Update Navbar" : "Create Navbar"}
            </button>

            {isEditMode && (
              <button
                type="button"
                onClick={() => {
                  setIsEditMode(false);
                  setFormData({
                    logo: "",
                    navLinks: [{ name: "", link: "" }],
                  });
                }}
                className="px-6 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* ===== Navbar Preview ===== */}
        {navbarData && (
          <div className="max-w-2xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Current Navbar Preview:
            </h3>

            {navbarData?.logo && (
              <img
                src={navbarData.logo}
                alt="Logo"
                className="h-12 mb-4 mx-auto object-contain"
              />
            )}

            {/* ✅ Corrected MAP for backend key "navlinks" */}
            <nav className="flex gap-6 justify-center flex-wrap">
              {navbarData?.navlinks?.map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  className="text-blue-600 font-medium hover:underline"
                >
                  {link.name || "Unnamed"}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarForm;
