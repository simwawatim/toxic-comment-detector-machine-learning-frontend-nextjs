"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { LoggedInUserProfile } from "@/app/api/client/client";
import Swal from "sweetalert2";
import {BASE_URL} from "@/app/api/base/base";

interface HeaderProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const HeaderComp = ({ isOpen, toggleSidebar }: HeaderProps) => {
  const [profileImage, setProfileImage] = useState("/default-profile.png");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try{
        const profile = await LoggedInUserProfile();
        const statusCode = profile.status_code
        const userProfileUrl = profile.data.profile_picture
        const fullProfilePictureUrl = BASE_URL + userProfileUrl
        console.log(fullProfilePictureUrl)

        setProfileImage(fullProfilePictureUrl|| "/default-profile.png");

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
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <header className="flex shadow-lg py-4 px-4 sm:px-10 bg-black text-white min-h-[70px] relative z-30">
      <div className="flex items-center justify-between w-full lg:hidden">
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        

        <div className="relative" ref={dropdownRef}>
          <img
            src={profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-600 shadow-sm object-cover cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg overflow-hidden z-50">
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              
            </div>
          )}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex items-center justify-between w-full lg:ml-[250px]">
        <Link href="/home" className="text-xl font-bold">
        
        </Link>

        <div className="relative" ref={dropdownRef}>
          <img
            src={profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-600 shadow-sm cursor-pointer object-cover"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg overflow-hidden z-50">
              <Link
                 href={`/profile/1`} 
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderComp;
