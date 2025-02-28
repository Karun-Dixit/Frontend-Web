const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-8 mb-4">
            <a href="#" className="text-gray-400 hover:text-blue-500">About Us</a>
            <a href="#" className="text-gray-400 hover:text-blue-500">Contact</a>
            <a href="#" className="text-gray-400 hover:text-blue-500">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-blue-500">Terms of Service</a>
          </div>
          <div className="text-gray-400 mb-4">
            <p>&copy; 2025 TechCycle. All Rights Reserved.</p>
          </div>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  