import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/common/admin/Navbar";
import Sidebar from "../../components/common/admin/Sidebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-6 bg-gray-100 h-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
