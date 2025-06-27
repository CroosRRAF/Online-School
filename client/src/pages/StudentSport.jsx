import React, { useEffect, useState } from "react";
import API from "../utils/axiosInstance.js"; // Make sure this file exists

const StudentSport = () => {
  const [mySports, setMySports] = useState([]);
  const [allSports, setAllSports] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch all available sports
  const fetchAllSports = async () => {
    try {
      const res = await API.get("/sports/");
      setAllSports(res.data.sports);
    } catch (err) {
      setError("Failed to fetch all sports.");
    }
  };

  // Fetch sports the student is registered for
  const fetchMySports = async () => {
    try {
      const res = await API.get("/sports/my-sports");
      setMySports(res.data.sports); // Make sure your backend sends `sports`
    } catch (error) {
      console.error(
        "Error fetching my sports:",
        error.response?.data || error.message
      );
      setError("Failed to load your registered sports.");
    }
  };

  // Register for a sport
  const handleRegister = async (sportId) => {
    try {
      setError("");
      const res = await API.post(`/sports/${sportId}/register`);
      setMessage(res.data.message);
      fetchMySports();
    } catch (err) {
      setError(err.response?.data?.message || "Error registering for sport");
    }
  };

  // Leave a sport
  const handleLeave = async (sportId) => {
    try {
      setError("");
      const res = await API.delete(`/sports/${sportId}/remove`);
      setMessage(res.data.message);
      fetchMySports();
    } catch (err) {
      setError(err.response?.data?.message || "Error leaving sport");
    }
  };

  useEffect(() => {
    fetchAllSports();
    fetchMySports();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Sports Dashboard</h1>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      {/* Registered Sports */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">My Sports</h2>
        {mySports.length > 0 ? (
          mySports.map((sport) => (
            <div
              key={sport._id}
              className="p-4 border rounded-md bg-white shadow-sm mb-2 flex justify-between"
            >
              <div>
                <h3 className="font-bold">{sport.sportName}</h3>
                <p className="text-sm text-gray-600">{sport.coach}</p>
              </div>
              <button
                onClick={() => handleLeave(sport._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Leave
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            You are not registered for any sports.
          </p>
        )}
      </section>

      {/* Available Sports */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Available Sports</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allSports.map((sport) => (
            <div
              key={sport._id}
              className="p-4 border rounded-md bg-gray-50 shadow-sm"
            >
              <h3 className="font-bold">{sport.sportName}</h3>
              <p className="text-sm text-gray-600">{sport.coach}</p>
              <button
                onClick={() => handleRegister(sport._id)}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Register
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentSport;
