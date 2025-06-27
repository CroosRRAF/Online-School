import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axiosInstance"; // ✅ shared instance

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      setSuccess("");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setSuccess("");
      return;
    }

    try {
      const response = await API.post("/authendication/register", formData);

      setSuccess("Registration successful! Redirecting to login...");
      setError("");

      // Optional: wait then navigate
      setTimeout(() => navigate("/login"), 2000);

      console.log("Student registered:", response.data);
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map((e) => e.msg).join(", "));
      } else {
        setError(
          err.response?.data?.message || "Registration failed. Please try again."
        );
      }
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Student Registration
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter student email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password (min 6 chars)"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default StudentRegister;
