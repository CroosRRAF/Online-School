import React, { useEffect, useState } from "react";
import API from "../utils/axiosInstance";

import DashboardHeader from "../components/DashboardHeader";
import DashboardCard from "../components/DashboardCard";
import ModulesList from "../components/ModulesList";
import AttendanceChart from "../components/AttendanceChart";
import SportsSection from "../components/SportsSection";
import BookBorrowSection from "../components/BookBorrowSection";
// import other components as needed
// import ExaminationCard from "../components/ExaminationCard";

const StudentDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const student = JSON.parse(localStorage.getItem("studentData"));
        const token = localStorage.getItem("studentToken");

        if (!student || !token) {
          setError("You are not logged in.");
          setLoading(false);
          return;
        }

        const response = await API.get(`/students/${student._id}/dashboard`);
        setDashboardData(response.data);
      } catch (error) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  const { student, attendanceSummary, borrowedBooks, grades } = dashboardData;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <DashboardHeader student={student} />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Results" value={student.results?.length || 0} />
          <DashboardCard title="Modules" value={student.modules?.length || 0} />
          <DashboardCard title="Attendance %" value={`${attendanceSummary.attendancePercent || 0}%`} />
          <DashboardCard title="Books Borrowed" value={borrowedBooks.length} />
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ModulesList Modules={student.modules} />
          <AttendanceChart data={attendanceSummary} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SportsSection sports={student.sports} />
          <BookBorrowSection books={borrowedBooks} />
        </div>

        {/* Future: ExaminationCard */}
      </div>
    </div>
  );
};

export default StudentDashboard;
