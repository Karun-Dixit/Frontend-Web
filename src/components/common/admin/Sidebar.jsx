import { useEffect, useState } from "react";
import {
  FaBars,
  FaEdit,
  FaEye,
  FaHome,
  FaSignOutAlt,
  FaUsers
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [sidebarHeight, setSidebarHeight] = useState("100vh");
  const navigate = useNavigate();

  useEffect(() => {
    const updateHeight = () => {
      setSidebarHeight(`${window.innerHeight}px`);
    };
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userToken");
    window.location.href = "/login";
  };

  return (
    <div
      className={`bg-gray-900 bg-opacity-80 backdrop-blur-lg text-white p-6 transition-all duration-300 flex flex-col fixed left-0 top-0 shadow-lg ${isOpen ? "w-64" : "w-20"} h-full rounded-r-xl`}
      style={{ height: sidebarHeight }}
    >
      {/* Toggle Button */}
      <button onClick={toggleSidebar} className="mb-6 text-2xl self-end text-gray-300 hover:text-white transition-all">
        <FaBars />
      </button>

      {/* Menu Items */}
      <ul className="space-y-6 flex-1 overflow-y-auto">
        <li>
          <Link to="/admin/dashboard" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-all">
            <FaHome className="text-xl" /> {isOpen && <span className="text-lg">Dashboard</span>}
          </Link>
        </li>

        {/* Products */}
        <li>
          <Link to="/admin/products/view-products" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-all">
            <FaEye className="text-xl" /> {isOpen && <span className="text-lg">View Products</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/products/add-products" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-all">
            <FaEdit className="text-xl" /> {isOpen && <span className="text-lg">Add Product</span>}
          </Link>
        </li>

        {/* Users */}
        <li>
          <Link to="/admin/users" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-all">
            <FaUsers className="text-xl" /> {isOpen && <span className="text-lg">Users</span>}
          </Link>
        </li>
      </ul>

      {/* Bottom Buttons */}
      <div className="mt-auto space-y-4 border-t border-gray-700 pt-4">
        {/* Public Dashboard Button */}
        <Link to="/dashboard" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-all">
          <FaHome className="text-xl" /> {isOpen && <span className="text-lg">Public Dashboard</span>}
        </Link>

        {/* Logout Button */}
        <button onClick={handleLogout} className="flex items-center gap-4 p-3 rounded-lg hover:bg-red-600 transition-all text-white">
          <FaSignOutAlt className="text-xl" /> {isOpen && <span className="text-lg">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
