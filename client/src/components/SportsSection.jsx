const SportsSection = ({ sports }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Sports Participation</h3>
      {sports.length === 0 ? (
        <p className="text-gray-500">Not participating in any sports.</p>
      ) : (
        <ul className="space-y-2">
          {sports.map((sport) => (
            <li key={sport._id} className="border p-3 rounded-lg">
              <div className="font-semibold">{sport.sportName}</div>
              <div className="text-sm text-gray-500">Coach: {sport.coach}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SportsSection;
