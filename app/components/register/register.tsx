"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RegisterClient } from "../../api/client/client";
import { RegisterResponse } from "../../api/types/types";
import Swal from "sweetalert2";

const RegisterComp = () => {
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setLoading(false);
      Swal.fire({
        title: "Failed",
        text: "Passwords do not match!",
        icon: "error",
        confirmButtonText: "Retry",
      });
      return;
    }

    try {
      const first_name = "None";
      const last_name = "None";

      const data: RegisterResponse = await RegisterClient({
        username,
        email,
        password,
        first_name,
        last_name,
      });

      // FIXED: Compare as NUMBER
      if (Number(data.status_code) !== 201) {
        Swal.fire({
          title: "Registration Failed",
          text: data.message,
          icon: "error",
          confirmButtonText: "Retry",
        });
        setLoading(false);
        return;
      }

      Swal.fire({
        title: "Registration Successful",
        text: "Your account has been created!",
        icon: "success",
        confirmButtonText: "Continue",
      });

      localStorage.setItem("user_email", email);
      router.push("/");
      return;

    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || error.message;

      Swal.fire({
        title: "Registration Failed",
        text: errorMsg,
        icon: "error",
        confirmButtonText: "Retry",
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">

      {/* Image Section */}
      <div className="hidden md:flex md:w-8/12 h-screen relative">
        <img
          src="/003-avatar.png"
          alt="Toxic Comment Background"
          className="w-full h-full object-cover"
        />
        <img
          src="/toxic-comment.jpeg"
          alt="Overlay Logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-4/12 flex items-center justify-center p-6 h-screen">
        <div className="w-full bg-white shadow-2xl rounded-2xl p-10 sm:p-12 relative">

          <h2 className="text-center text-3xl font-extrabold text-gray-900 mt-6">
            Register
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Create an account to start detecting toxic comments
          </p>

          <form onSubmit={handleRegisterSubmit} className="mt-8 space-y-6">
            
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center items-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-50 transition"
            >
              {loading ? (
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 018 8h-4l3.5 3.5L20 12h-4a8 8 0 01-8 8v-4l-3.5 3.5L4 20v-4a8 8 0 01-8-8z"></path>
                </svg>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-gray-500">
            <p>
              Already have an account?{" "}
              <a href="/" className="text-purple-600 hover:underline">Sign in</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterComp;
