import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-lg font-bold">Admin Panel</div>

      {/* User Icon */}
      <div className="flex items-center gap-2">
        <FaUserCircle className="text-2xl" />
        <span className="hidden sm:inline">Admin</span>
      </div>
    </nav>
  );
};

export default Navbar;
