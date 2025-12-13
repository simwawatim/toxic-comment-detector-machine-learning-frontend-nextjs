"use client";

import { useState } from "react";
import SidebarComp from "../components/base/sidenav/sidenav";
import HeaderComp from "../components/base/header/header";
import HomePageComp from "../components/home/home";

const HomeClient = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <HeaderComp isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SidebarComp isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Main chat area */}
        <main className="flex-1 p-4 md:p-6 bg-white lg:ml-[250px]">
          <HomePageComp />
        </main>
      </div>
    </div>
  );
};

export default HomeClient;
