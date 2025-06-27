import React from "react";

const AttendanceChart = ({ data = {} }) => {
  const {
    presentDays = 0,
    totalDays = 0,
    attendancePercent = 0,
  } = data;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Attendance Summary</h3>
      <div className="text-gray-600 space-y-1">
        <p>
          <strong>Present Days:</strong> {presentDays}
        </p>
        <p>
          <strong>Total Days:</strong> {totalDays}
        </p>
        <p>
          <strong>Attendance %:</strong> {attendancePercent}%
        </p>
      </div>
    </div>
  );
};

export default AttendanceChart;
