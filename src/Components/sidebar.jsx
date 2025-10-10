"use client";
import React, { useState } from "react";
import { Home, LogOut } from "lucide-react";
import { TbLayoutNavbar } from "react-icons/tb";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { SiMobxstatetree } from "react-icons/si";
import { MdDeviceUnknown } from "react-icons/md";
import { RiUserCommunityFill } from "react-icons/ri";
import { FaNetworkWired } from "react-icons/fa";
import { VscSymbolInterface } from "react-icons/vsc";
import { VscPreview } from "react-icons/vsc";
import { IoPricetagOutline } from "react-icons/io5";
import { FaQuoteLeft } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { CgUnavailable } from "react-icons/cg";
import { IoCallOutline } from "react-icons/io5";
import { FaArrowTrendDown } from "react-icons/fa6";

const Sidebar = () => {
  const [popup, setPopup] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen ">
      <div className="w-80 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          sAp APP
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <a
            href="/navbar"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <TbLayoutNavbar size={20} /> Navbar Section
          </a>
          <a
            href="/hero"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <Home size={20} /> Home Section
          </a>
          <a
            href="/state"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <SiMobxstatetree size={20} /> Stats Section
          </a>
          <a
            href="/features"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <MdOutlineFeaturedPlayList size={20} /> Features Section
          </a>
          <a
            href="/device"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <MdDeviceUnknown size={20} /> Device Section
          </a>
          <a
            href="/comunication"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <RiUserCommunityFill size={20} /> Communicate Section
          </a>
          <a
            href="/sapwork"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <FaNetworkWired size={20} /> sApp Works Section
          </a>
          <a
            href="/interface"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <VscSymbolInterface size={20} /> Interface Section
          </a>
          <a
            href="/reviews"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <VscPreview size={20} /> Reviews Section
          </a>
          <a
            href="/pricing"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <IoPricetagOutline size={20} /> Pricing Section
          </a>
          <a
            href="/teams"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <RiTeamLine size={20} /> Team Section
          </a>
          <a
            href="/available"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <CgUnavailable size={20} /> Available Section
          </a>
          <a
            href="/contectus"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <IoCallOutline size={20} /> Contact Us Section
          </a>
          <a
            href="/footer"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <FaArrowTrendDown size={20} /> Footer Section
          </a>
        </nav>
        {popup && (
          // div for popup for asking user to confirm logout or not
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
              <p className="text-gray-800">Are you sure you want to logout?</p>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={() => setPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => setPopup(true)} // 👈 ab poora button clickable hoga
            className="flex items-center gap-3 p-2 w-full rounded-lg hover:bg-gray-700 transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
