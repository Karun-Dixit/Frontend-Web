import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import PublicNavbar from '../common/customer/PublicNavbar';

const PublicDashboard = () => {
  const [productSections] = useState([
    {
      title: 'Trending Electronics',
      products: [
        { id: 1, name: 'MSi Katana', price: 120000, description: 'Best gaming laptop', image: 'public/images/katana.png' },
        { id: 2, name: 'iPhone 13', price: 90000, description: 'Best condition', image: 'public/images/iphone.png' },
        { id: 3, name: 'HP Victus Laptop', price: 150000, description: 'Best for gaming', image: 'public/images/victus.png' },
        { id: 4, name: 'JBL Speaker', price: 1600, description: 'Very Durable', image: 'public/images/jbl.png' },
      ],
    },
    {
      title: 'Hot Deals',
      products: [
        { id: 5, name: 'Laptop Sleeve Case', price: 200, description: 'Durable, water-resistant', image: 'public/images/sleeve.png' },
        { id: 6, name: 'Bluetooth Speaker X', price: 2000, description: 'Portable, 10-hour battery', image: 'public/images/bluetooth.png' },
        { id: 7, name: 'Smart Home Hub', price: 3200, description: 'Control all your smart devices', image: 'public/images/hub.png' },
        { id: 8, name: 'Play Station 5', price: 90000, description: 'Includes 2 controllers and 3 games', image: 'public/images/ps.png' },
      ],
    },
    {
      title: 'Top Picks',
      products: [
        { id: 9, name: 'Smartwatch X100', price: 1900, description: 'Fitness tracking, heart rate monitor', image: 'public/images/watch.png' },
        { id: 10, name: '4K Camera G6', price: 7000, description: 'High-definition recording, optical zoom', image: 'public/images/camera.png' },
        { id: 11, name: 'Wireless Charger', price: 1200, description: 'Fast charging', image: 'public/images/charger.png' },
        { id: 12, name: 'Tablet Pro 10', price: 23000, description: '10.1-inch display', image: 'public/images/tablet.png' },
      ],
    },
  ]);

  const [cartMessage, setCartMessage] = useState('');
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    touchThreshold: 5,
    nextArrow: <button className="text-white text-3xl absolute right-4 top-1/2 transform -translate-y-1/2 z-10">→</button>,
    prevArrow: <button className="text-white text-3xl absolute left-4 top-1/2 transform -translate-y-1/2 z-10">←</button>,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleAddToCart = (productName) => {
    setCartMessage(`${productName} has been added to your cart!`);
    setTimeout(() => setCartMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <PublicNavbar />

      {/* Cart Message */}
      {cartMessage && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate__animated animate__fadeIn animate__delay-1s">
          {cartMessage}
        </div>
      )}

      {/* Dashboard Content */}
      <div className="container mx-auto py-12 px-6">
        {productSections.map((section, index) => (
          <div key={index} className="mb-20">
            {/* Title/Section Header */}
            <h1 className="text-4xl font-semibold text-left mb-12 tracking-wide text-gray-800">{section.title}</h1>

            {/* Product Carousel */}
            <div className="px-4">
              <Slider {...sliderSettings}>
                {section.products.map((product) => (
                  <div key={product.id} className="px-4 transition-all transform hover:scale-105">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 ease-in-out">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-56 object-cover rounded-lg mb-6 transition-transform duration-300 ease-in-out hover:scale-110"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x200?text=Image+Not+Found'; }}
                      />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-700 text-lg font-medium mb-4">Rs {product.price}</p>
                      <p className="text-gray-600 text-sm mb-6">{product.description}</p>
                      {/* Add to Cart Button */}
                      <button
                        className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
                        onClick={() => handleAddToCart(product.name)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicDashboard;
