"use client";

import { useState } from "react";
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

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarComp = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const profileName = "John Banda";
  const username = "jbanda";

  const allUsers = [
    { id: 1, name: "Mary Zulu", username: "mzulu", avatar: "/default-profile.png" },
    { id: 2, name: "Peter Mwape", username: "pmwape", avatar: "/default-profile.png" },
    { id: 3, name: "Helen Chola", username: "hchola", avatar: "/default-profile.png" },
    { id: 4, name: "David Phiri", username: "dphiri", avatar: "/default-profile.png" },
  ];

  const [search, setSearch] = useState("");
  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
  );

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

        {/* USERS LIST */}
        <ul className="space-y-2 mb-6">
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <Link
                href={`/home?user=${user.id}`}
                className="flex items-center gap-3 px-4 py-2 rounded bg-gray-900 hover:bg-purple-600 text-white transition-all"
              >
                <img
                  src={user.avatar}
                  className="w-10 h-10 rounded-full border border-gray-600 object-cover"
                />
                <div>
                  <p className="text-white text-[15px] font-semibold">
                    {user.name}
                  </p>
                  <p className="text-gray-400 text-[13px]">@{user.username}</p>
                </div>
              </Link>
            </li>
          ))}

          {filteredUsers.length === 0 && (
            <p className="text-gray-400 text-sm px-2">No users found</p>
          )}
        </ul>

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

export default SidebarComp;
