const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 text-center">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
};

export default DashboardCard;