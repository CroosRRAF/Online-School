import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axiosInstance"; // ✅ use shared instance

const StudentLogin = () => {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      setSuccess("");
      return;
    }

    try {
      const response = await API.post("/authendication/login", {
        email,
        password,
      });

      const { token, student } = response.data;

      // ✅ Store the token for future requests
      localStorage.setItem("studentToken", token);
      localStorage.setItem("studentData", JSON.stringify(student));

      setSuccess("Login successful!");
      setError("");

      // ✅ Redirect to dashboard
      navigate("/student-dashboard");

      // console.log("Student logged in:", response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Student Login
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
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your student email"
              value={email}
              onChange={(e) => setMail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;
