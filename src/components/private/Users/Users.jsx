import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]); // State to store the users data
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get('http://localhost:5000/api/v1/auth/getAllCustomers', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });
        setUsers(response.data.data); // Store users in the state
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchUsers();
  }, []);

  // Handle deleting a user
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await axios.delete(`http://localhost:5000/api/v1/auth/deleteCustomer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });
      console.log("User deleted:", response.data);
      // Remove the deleted user from the state without needing to refetch
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div>
          <div className="text-lg font-semibold text-gray-800 mb-3">Users</div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 border-b text-left text-gray-600">User Name</th>
                  <th className="py-2 px-3 border-b text-left text-gray-600">Email</th>
                  <th className="py-2 px-3 border-b text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">No users available</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="py-2 px-3 border-b">{user.fName}</td>
                      <td className="py-2 px-3 border-b">{user.email}</td>
                      <td className="py-2 px-3 border-b">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-500 hover:text-red-700 text-sm"
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
        </div>
      )}
    </div>
  );
};

export default Users;
