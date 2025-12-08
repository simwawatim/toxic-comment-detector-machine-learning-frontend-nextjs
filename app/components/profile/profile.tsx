"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import HeaderComp from "../../components/base/header/header";
import SidebarComp from "../../components/base/sidenav/sidenav";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar?: string;
  password?: string;
}

// Sample users
const users: User[] = [
  { id: 1, firstName: "John", lastName: "Banda", username: "jbanda", email: "john@example.com", avatar: "/default-profile.png" },
  { id: 2, firstName: "Mary", lastName: "Zulu", username: "mzulu", email: "mary@example.com", avatar: "/default-profile.png" },
  { id: 3, firstName: "Peter", lastName: "Mwape", username: "pmwape", email: "peter@example.com", avatar: "/default-profile.png" },
];

const ProfilePage = () => {
  const params = useParams();
  const userId = Number(params.id);

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | undefined>("");
  const [password, setPassword] = useState("");

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const found = users.find(u => u.id === userId) || null;
    if (found) {
      setUser(found);
      setFirstName(found.firstName);
      setLastName(found.lastName);
      setUsername(found.username);
      setEmail(found.email);
      setAvatar(found.avatar);
    }
  }, [userId]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log({
      firstName,
      lastName,
      username,
      email,
      avatar,
      password: password ? password : "unchanged",
    });
    alert("Profile updated (mock)");
  };

  if (!user) return <p className="text-center mt-20 text-gray-500">User not found</p>;

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <HeaderComp isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SidebarComp isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-100 lg:ml-[250px]">
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h2>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <img
                src={avatar || "/default-profile.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full border border-gray-300 mb-3 object-cover"
              />
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </div>

            {/* First & Last Name */}
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="First Name"
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              
            </div>

            {/* Username */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <input
                type="password"
                placeholder="New Password"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-sm text-gray-400 mt-1">Leave blank to keep current password</p>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
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
