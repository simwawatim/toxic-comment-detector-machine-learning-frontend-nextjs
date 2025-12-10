"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getUserByIdClient } from "@/app/api/client/client";
import { BASE_URL, DEFAULT_AVATAR } from "@/app/api/base/base";

const HomePageComp = () => {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("user");

  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
  if (!selectedId) return;

  const getUserProfile = async () => {
    try {
      const userId = Number(selectedId);
      const response = await getUserByIdClient(userId);

      const data = setSelectedUser(response.data);
      console.log(data)

    } catch (error) {
      console.error("Failed to fetch user:", error);
      setSelectedUser(null);
    }
  };

  getUserProfile();
}, [selectedId]);
const profileUrl = selectedUser?.profile_picture
    ? `${BASE_URL}${selectedUser.profile_picture}`
    : DEFAULT_AVATAR;
  return (
    <div className="flex h-[90vh] mt-4 bg-black rounded-lg overflow-hidden shadow-lg">

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col bg-white">

        {/* HEADER */}
        <div className="p-4 border-b bg-black text-white">
          {selectedUser ? (
            <div className="flex items-center gap-3">
              <img
                src={profileUrl}
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_AVATAR; 
                }}
                className="w-10 h-10 rounded-full border border-gray-300"
                alt="Profile picture"
              />
              <div>
                <h3 className="font-semibold">{selectedUser.email}</h3>
                <p className="text-sm text-gray-400">@{selectedUser.username}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-300">Select a user to start chatting</p>
          )}
        </div>

        {/* MESSAGES (scrollable only) */}
        <div className="flex-1 p-4 overflow-y-scroll">
          {!selectedUser ? (
            <p className="text-center mt-20 text-gray-400">No user selected</p>
          ) : (
            <>
              <div className="mb-3">
                <p className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg">
                  Hi, how can I help you?
                </p>
              </div>

              <div className="flex justify-end mb-3">
                <p className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg">
                  I need assistance.
                </p>
              </div>
            </>
          )}
        </div>

        {/* FIXED INPUT BOX */}
        {selectedUser && (
          <div className="p-4 border-t bg-white flex gap-3">
            <input
              type="text"
              placeholder={`Message @${selectedUser.username}...`}
              className="block w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button className="bg-green-700 text-white px-4 py-2 rounded-lg">
              Send
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default HomePageComp;
