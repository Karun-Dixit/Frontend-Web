import axios from "axios";
import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    status: "",
    image: null, // Store image file for upload
  });

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input for image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("quantity", formData.quantity);
    form.append("status", formData.status);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/products/add", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product Added Successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("There was an error adding the product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-gray-600">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            rows="3"
          ></textarea>
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-600">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-600">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {/* Image Preview */}
          {formData.image && (
            <div className="mt-3">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Product Preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
