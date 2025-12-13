"use client";

import React, { useEffect, useState, useRef, JSX } from "react";
import { useSearchParams } from "next/navigation";
import { createMessageClient, getUserByIdClient, UserMessageList } from "@/app/api/client/client";
import { BASE_URL, DEFAULT_AVATAR } from "@/app/api/base/base";
import { createMessageResponse } from "@/app/api/types/types";
import { decodeAccessToken } from "@/app/api/base/decode_token";
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

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
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get userId from access token
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = decodeAccessToken(token);
      setUserId(Number(decoded));
    }
  }, []);

  // Fetch messages for selected user
  const fetchMessages = async (userId: number) => {
    try {
      const messageResponse = await UserMessageList(userId);

      const sortedMessages = (messageResponse.data || []).sort(
        (a: Message, b: Message) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      setMessages(sortedMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setMessages([]);
    }
  };

  // Fetch selected user profile and messages
  useEffect(() => {
    if (!selectedId) return;

    const getUserProfile = async () => {
      try {
        const userId = Number(selectedId);
        const response = await getUserByIdClient(userId);

        setSelectedUser(response.data);
        await fetchMessages(userId);
      } catch (error) {
        console.error("Failed to fetch user or messages:", error);
        setSelectedUser(null);
        setMessages([]);
      }
    };

    getUserProfile();
  }, [selectedId]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send new message
  const handleCreateMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser || !userId) return;

    setLoading(true);

    try {
      const receiver = Number(selectedId);
      const createMsgResponse: createMessageResponse = await createMessageClient({
        receiver,
        text: newMessage,
      });

      const data = createMsgResponse.data;

      const newMsg: Message = {
        id: data.id,
        sender: data.sender,
        receiver: data.receiver,
        text: data.text,
        toxic_tag: data.toxic_tag,
        created_at: data.created_at,
      };

      setMessages((prev) => [...prev, newMsg]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const profileUrl = selectedUser?.profile_picture
    ? `${BASE_URL}${selectedUser.profile_picture}`
    : DEFAULT_AVATAR;

  const tagIcons: Record<string, JSX.Element> = {
    none: <CheckCircleIcon className="w-4 h-4 text-green-500" />,
    toxic: <XCircleIcon className="w-4 h-4 text-red-500" />,
    offensive: <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />,
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow">
      {/* Header */}
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

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2 bg-gray-100">
        {!selectedUser ? (
          <p className="text-center mt-20 text-gray-400">No user selected</p>
        ) : (
          <>
            {messages.map((msg) => {
              if (!userId) return null;
              const isSent = msg.sender === userId;

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

                  <span className="mt-1">{tagIcons[msg.toxic_tag || "none"]}</span>

                  <span className="mt-0.5 text-xs text-gray-500">
                    {new Date(msg.created_at).toLocaleString()}
                  </span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input box */}
      {selectedUser && userId && (
        <form onSubmit={handleCreateMessage} className="p-4 border-t bg-white flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message @${selectedUser.username}...`}
            className="flex-1 rounded-2xl border border-gray-300 px-5 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      )}
    </div>
  );
};

export default HomePageComp;
