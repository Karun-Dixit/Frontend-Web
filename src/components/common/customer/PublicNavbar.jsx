import React, { useState } from 'react';
import { FiMenu, FiShoppingCart, FiUser, FiX } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PublicNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate for redirecting
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const toggleProfileDropdown = () => {
    setProfileOpen(!profileOpen);
  };

  const toggleCartDropdown = () => {
    setCartOpen(!cartOpen);
  };

  // Cart Items (Example with product image, name, and price)
  const cartItems = [
    {
      id: 1,
      name: 'MSI Katana',
      price: 'Rs 120000',
      imageUrl: 'public/images/katana.png', // Example image URL
    },
    {
      id: 2,
      name: 'Iphone13',
      price: 'Rs 90000',
      imageUrl: 'public/images/iphone.png', // Example image URL
    },
  ];

  const handleLogout = () => {
    // You can add any necessary logic for logging out here (e.g., clearing session data)
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo and Text */}
        <Link to="/" className="flex items-center text-3xl font-bold text-gray-800 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-110">
          {/* Placeholder for logo */}
          <img src="public/images/logo.png" alt="Logo" className="w-18 h-16 mr-2" /> {/* Adjust the width and height of the logo */}
          TechCycle
        </Link>

        {/* Navigation Links - Centered */}
        <div className="hidden md:flex space-x-8 w-full justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-lg text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out ${
                location.pathname === link.to ? "font-bold text-blue-600" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Cart Icon */}
        <div className="relative mr-6" onClick={toggleCartDropdown}>
          <FiShoppingCart size={28} className="text-gray-700 hover:text-blue-600 cursor-pointer transition duration-300 ease-in-out" />
          
          {/* Cart Dropdown */}
          {cartOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg border-2 border-blue-500 p-4 transition transform scale-95 hover:scale-100">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 text-gray-700 hover:bg-gray-100 transition duration-200 ease-in-out">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="ml-3 flex-1">
                      <span className="block font-semibold">{item.name}</span>
                      <span className="block text-sm text-gray-500">{item.price}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-700">Your cart is empty</div>
              )}
              <Link to="/cart" className="block w-full mt-2 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out">
                View Cart
              </Link>
            </div>
          )}
        </div>

        {/* Profile Icon with Dropdown */}
        <div className="relative">
          <button onClick={toggleProfileDropdown} className="text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out">
            <FiUser size={28} />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border-2 border-blue-500 p-2 transition duration-200 ease-in-out transform scale-95 hover:scale-100">
              <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200 ease-in-out">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition duration-200 ease-in-out"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-6 py-4 text-xl text-gray-700 hover:bg-gray-100 transition duration-200 ease-in-out"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={1500} />
    </nav>
  );
};

export default PublicNavbar;
