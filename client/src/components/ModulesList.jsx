import React from "react";

const ModulesList = ({ modules = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Enrolled Modules</h3>
      {modules.length === 0 ? (
        <p className="text-gray-500">No modules enrolled.</p>
      ) : (
        <ul className="space-y-2">
          {modules.map((module) => (
            <li
              key={module._id}
              className="border p-3 rounded-lg hover:bg-gray-50"
            >
              <div className="font-semibold">{module.moduleName}</div>
              <div className="text-sm text-gray-500">
                Instructor: {module.instructor || "N/A"} • Credits: {module.credit || 0}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModulesList;
