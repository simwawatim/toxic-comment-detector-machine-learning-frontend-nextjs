"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { getUserByIdClient, UserMessageList } from "@/app/api/client/client";
import { BASE_URL, DEFAULT_AVATAR } from "@/app/api/base/base";

interface Message {
  id: string;
  sender: number;
  receiver: number;
  text: string;
  toxic_tag: string;
  created_at: string;
}

const HomePageComp = () => {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("user");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const currentUserId = 7; // Replace with the logged-in user's ID dynamically
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedId) return;

    const getUserProfile = async () => {
      try {
        const userId = Number(selectedId);
        const response = await getUserByIdClient(userId);
        setSelectedUser(response.data);

        const messageResponse = await UserMessageList(userId);
        // Sort messages ascending (oldest first)
        const sortedMessages = (messageResponse.data || []).sort(
          (a: Message, b: Message) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        setMessages(sortedMessages);
      } catch (error) {
        console.error("Failed to fetch user or messages:", error);
        setSelectedUser(null);
      }
    };

    getUserProfile();
  }, [selectedId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const profileUrl = selectedUser?.profile_picture
    ? `${BASE_URL}${selectedUser.profile_picture}`
    : DEFAULT_AVATAR;

  const tagColors: Record<string, string> = {
    toxic: "bg-red-500",
    offensive: "bg-yellow-500",
    none: "bg-gray-400",
  };

  return (
    <div className="flex h-[90vh] mt-4 bg-black rounded-lg overflow-hidden shadow-lg">
      <div className="flex-1 flex flex-col bg-white">
        {/* HEADER */}
        <div className="p-4 border-b bg-black text-white">
          {selectedUser ? (
            <div className="flex items-center gap-3">
              <img
                src={profileUrl}
                onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
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

        {/* MESSAGES */}
        <div className="flex-1 p-4 overflow-y-scroll flex flex-col gap-2">
          {!selectedUser ? (
            <p className="text-center mt-20 text-gray-400">No user selected</p>
          ) : (
            <>
              {messages.map((msg) => {
                const isSent = msg.sender === currentUserId;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isSent ? "items-end" : "items-start"}`}
                  >
                    <p
                      className={`inline-block px-4 py-2 rounded-lg text-white ${
                        isSent ? "bg-green-600" : "bg-gray-800"
                      }`}
                    >
                      {msg.text}
                    </p>
                    <span
                      className={`mt-1 text-xs text-white px-2 py-0.5 rounded ${tagColors[msg.toxic_tag || "none"]}`}
                    >
                      {msg.toxic_tag || "none"}
                    </span>
                    <span className="mt-0.5 text-xs text-gray-500">
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} /> {/* Scroll target */}
            </>
          )}
        </div>

        {/* INPUT BOX */}
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
