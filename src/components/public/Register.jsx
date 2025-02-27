import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    fName: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  const { fName, email, password, termsAccepted } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert("You must accept the Terms and Conditions.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/register", formData);
      console.log(response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="font-[sans-serif] bg-gray-50 max-w-4xl flex items-center justify-center mx-auto md:h-screen p-6">
      <div className="grid md:grid-cols-3 items-center shadow-xl rounded-xl overflow-hidden bg-white p-8">
        <div className="flex flex-col justify-center space-y-8 text-gray-800 max-md:order-1 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-8 rounded-l-xl">
          <div>
            <h4 className="text-2xl font-semibold">Create Your Account</h4>
            <p className="text-lg mt-3 leading-relaxed">
              Join TechCycle by creating a simple account. It's quick and easy!
            </p>
          </div>
          <div>
            <h4 className="text-2xl font-semibold">Secure Registration</h4>
            <p className="text-lg mt-3 leading-relaxed">
              We ensure your data security and privacy are our top priorities.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="md:col-span-2 w-full py-6 px-6 sm:px-16 max-md:max-w-xl mx-auto">
          <div className="mb-6">
            <h3 className="text-gray-800 text-2xl font-bold">Create an account</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Name</label>
              <input
                name="fName"
                type="text"
                value={fName}
                onChange={handleChange}
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 py-2.5 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Email</label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 py-2.5 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 py-2.5 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            <div className="flex items-center">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                checked={termsAccepted}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="termsAccepted" className="ml-3 text-sm text-gray-600">
                I accept the{" "}
                <a href="#" className="text-blue-600 font-semibold hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none shadow-md"
            >
              Create an account
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-6 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-semibold hover:underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
