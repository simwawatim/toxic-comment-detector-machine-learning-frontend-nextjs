"use client";


import { useEffect, useState, useRef } from "react";

import Link from "next/link";
import {
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaSchool,
  FaUser,
  FaSignOutAlt,
  FaProjectDiagram,
  FaExchangeAlt,
  FaHardHat,
} from "react-icons/fa";
import { LoggedInUserProfile, UserListClient } from "@/app/api/client/client";
import Swal from "sweetalert2";
import { UserListResponse, UserListResponseData } from "@/app/api/types/types";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarComp = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const [userList, setUserList] = useState<UserListResponseData[]>([]);

  const [search, setSearch] = useState("");
  const [username, setUsername] = useState<string>("");
  const [profileName, setProfileName] = useState<string>("")

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const filteredUsers = userList.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  useEffect(() => {
      const fetchProfile = async () => {
        try{
          const profile = await LoggedInUserProfile();
          const statusCode = profile.status_code
          const email = profile.data.email
          
          setUsername(profile.data.username);
          setProfileName(email)
      

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

      const fetchUsers = async () => {
      try {
        const response: UserListResponse = await UserListClient();
        setUserList(
          response.data.map((u) => ({
            ...u,
            profile_picture: u.profile_picture
              ? `http://127.0.0.1:8000${u.profile_picture}`
              : "/default-profile.png",
          }))
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
      fetchProfile();
      fetchUsers();
    }, []);
  return (
    <>
      <nav
        className={`bg-black fixed top-0 left-0 h-full min-w-[250px] py-6 px-4 z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="text-white text-2xl font-bold mb-6 hidden lg:block">
          TCC
        </div>

        {/* USER PROFILE */}
        <div className="flex items-center gap-3 mb-6 p-3 bg-gray-800 rounded-lg">
          <img
            src="/default-profile.png"
            alt="profile"
            className="w-12 h-12 rounded-full border border-gray-600 object-cover"
          />
          <div>
            <p className="text-white font-semibold text-[15px]">{profileName}</p>
            <p className="text-gray-300 text-[13px]">@{username}</p>
          </div>
        </div>

        {/* USERS SEARCH */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 mb-4 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
        />

        <ul className="space-y-2 mb-4">
          {currentUsers.map((user) => (
            <li key={user.id}>
              <Link
                href={`/home?user=${user.id}`}
                className="flex items-center gap-3 px-4 py-2 rounded bg-gray-900 hover:bg-purple-600 text-white transition-all"
              >
                <img
                  src={user.profile_picture || "/default-profile.png"}
                  className="w-10 h-10 rounded-full border border-gray-600 object-cover"
                />
                <div>
                  <p className="text-white text-[15px] font-semibold">{user.username}</p>
                  <p className="text-gray-400 text-[13px] break-words">
                    {user.email.length > 10 ? `${user.email.slice(0, 15)}...` : user.email}
                  </p>

                </div>
              </Link>
            </li>
          ))}

          {currentUsers.length === 0 && (
            <p className="text-gray-400 text-sm px-2">No users found</p>
          )}
        </ul>

        {/* PAGINATION */}
        <div className="flex justify-center gap-2 mb-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

          {filteredUsers.length === 0 && (
            <p className="text-gray-400 text-sm px-2">No users found</p>
          )}
  

        <button
          onClick={() => localStorage.removeItem("token")}
          className="w-full text-left text-white bg-purple-600 font-medium hover:bg-black-900 text-[15px] flex items-center gap-3 rounded px-4 py-2 transition-colors"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default SidebarComp