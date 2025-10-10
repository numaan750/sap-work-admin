"use client"
import React, { use, useContext, useState } from "react";
import Link from "next/link";
import { AppContext } from "@/Context/appcontext";


const login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const {login} = useContext(AppContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.status === "success") {
      window.location.href = "/navbar";
    }

    else {
      alert("Login failed!");
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-950">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
        <p className="text-gray-600 text-center mb-6">
          Please fill in this form to create an account!
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
        
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="h-4 w-4" />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I accept the
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Use
              </a>
              &
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-[40%] bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-900 transition">
            login
          </button>
         {/* Signup Redirect */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 font-medium hover:underline hover:text-blue-800"
            >
              Signup here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default login;