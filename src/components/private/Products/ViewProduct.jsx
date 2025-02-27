import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to navigate to different pages

  // Handle edit product - navigate to edit page
  const handleEdit = (productId) => {
    navigate(`/admin/products/edit-products/${productId}`); // Navigate to edit product page
  };

  // Handle delete product
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`);
        setProducts(products.filter((product) => product._id !== productId));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        setError("Failed to delete product. Please try again.");
      }
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <div className="text-lg font-semibold text-gray-800 mb-3">Products</div>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 border-b text-left text-gray-600">Product Image</th>
                  <th className="py-2 px-3 border-b text-left text-gray-600">Product Name</th>
                  <th className="py-2 px-3 border-b text-left text-gray-600">Price</th>
                  <th className="py-2 px-3 border-b text-left text-gray-600">Quantity</th>
                  <th className="py-2 px-3 border-b text-left text-gray-600">Status</th>
                  <th className="py-2 px-3 border-b text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">No products available</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="py-2 px-3 border-b">
                        <img
                          src={
                            product.image
                              ? `http://localhost:5000/uploads/${product.image.replace(/^uploads[\\/]/, "")}`
                              : "/default-image.png"
                          }
                          alt="Product"
                          className="w-12 h-12 object-cover rounded-lg"
                          onError={(e) => (e.target.src = "/default-image.png")}
                        />
                      </td>
                      <td className="py-2 px-3 border-b">{product.name}</td>
                      <td className="py-2 px-3 border-b">${product.price}</td>
                      <td className="py-2 px-3 border-b">{product.quantity}</td>
                      <td className="py-2 px-3 border-b">{product.status}</td>
                      <td className="py-2 px-3 border-b">
                        <button
                          className="text-blue-500 hover:text-blue-700 mr-2 text-sm"
                          onClick={() => handleEdit(product._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 text-sm"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProduct;
