"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import HeaderComp from "../../components/base/header/header";
import SidebarComp from "../../components/base/sidenav/sidenav";
import { LoggedInUserProfile, updateUserProfileClient } from "@/app/api/client/client";
import { BASE_URL } from "@/app/api/base/base";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const params = useParams();
  const userId = Number(params.id);

  const [isOpen, setIsOpen] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState("");
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // -----------------------------
  // Fetch profile from backend
  // -----------------------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await LoggedInUserProfile();
        const statusCode = profile.status_code;

        if (Number(statusCode) === 401) {
          Swal.fire({
            title: "Session Expired",
            text: "Your login session has expired. Please login again.",
            icon: "warning",
            confirmButtonText: "Login",
          }).then(() => {
            localStorage.removeItem("access_token");
            window.location.href = "/login";
          });
          return;
        }

        const fullProfilePictureUrl = BASE_URL + profile.data.profile_picture;

        setAvatar(fullProfilePictureUrl || "/default-profile.png");
        setEmail(profile.data.email);
        setUsername(profile.data.username);
        // setFirstName(profile.data.first_name || "");
        // setLastName(profile.data.last_name || "");
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // -----------------------------
  // Avatar preview + store file
  // -----------------------------
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setAvatar(URL.createObjectURL(file)); // preview
    }
  };

  // -----------------------------
  // SAVE PROFILE (Real API Save)
  // -----------------------------
  const handleSave = async () => {
    try {
      const res = await updateUserProfileClient({
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        password: password || undefined,
        profile_picture: profileFile,
      });

      if (res.status_code === 200) {
        Swal.fire("Success", "Profile updated successfully!", "success");
      } else {
        Swal.fire("Error", res.message || "Failed to update profile", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Unexpected error occurred", "error");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* HEADER */}
      <HeaderComp isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        <SidebarComp isOpen={isOpen} toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-100 lg:ml-[250px]">
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-black font-semibold mb-6 text-center">
              Edit Profile
            </h2>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <img
                src={avatar || "/default-profile.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full border border-gray-300 mb-3 object-cover"
              />

              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
            </div>

            {/* Username */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <input
                type="password"
                placeholder="New Password"
                className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-sm text-gray-400 mt-1">
                Leave blank to keep current password
              </p>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Save Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
