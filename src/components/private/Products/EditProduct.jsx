import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { productId } = useParams(); // Get productId from the URL
  const navigate = useNavigate(); // Hook to navigate after editing
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    status: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null); // For storing the selected file

  // Fetch the product data by productId
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError("Failed to load product data. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
  };

  // Handle submit form to update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to send the image file
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("status", product.status);

    // Append the new file if there's one selected
    if (file) {
      formData.append("image", file);
    } else {
      // If no file is selected, send the current image path
      formData.append("image", product.image);
    }

    try {
      await axios.put(`http://localhost:5000/api/products/update/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // This tells the server we're uploading a file
        },
      });
      alert("Product updated successfully!");
      navigate("/admin/products/view-products"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  // Handle product deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      alert("Product deleted successfully!");
      navigate("/admin/products/view-products"); // Redirect after successful delete
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  // Loading and error states
  if (loading) {
    return <p>Loading product data...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={product.name || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={product.price || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={product.quantity || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="status">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={product.status || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="image">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 ml-4"
        >
          Delete Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
