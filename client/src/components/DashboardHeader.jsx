const DashboardHeader = ({ student }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Welcome, {student.name} 👋
      </h2>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardHeader;
