"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const HomePageComp = () => {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("user");

  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
    { id: 1, name: "John Banda", username: "jbanda", avatar: "/default-profile.png" },
    { id: 2, name: "Mary Zulu", username: "mzulu", avatar: "/default-profile.png" },
    { id: 3, name: "Peter Mwape", username: "pmwape", avatar: "/default-profile.png" },
  ];

  useEffect(() => {
    if (selectedId) {
      const found = users.find((u) => u.id === Number(selectedId));
      setSelectedUser(found || null);
    }
  }, [selectedId]);

  return (
    <div className="flex h-[90vh] mt-4 bg-black rounded-lg overflow-hidden shadow-lg">

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col bg-white">

        {/* HEADER */}
        <div className="p-4 border-b bg-black text-white">
          {selectedUser ? (
            <div className="flex items-center gap-3">
              <img
                src={selectedUser.avatar}
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <div>
                <h3 className="font-semibold">{selectedUser.name}</h3>
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
