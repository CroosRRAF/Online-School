import React from "react";
import { Routes, Route } from "react-router-dom";

import StudentLogin from './pages/StudentLogin.jsx';
import StudentRegister from './pages/StudentRegister.jsx';
import StudentDashboard from "./pages/StudentDashboard.jsx";
import StudentSport from "./pages/StudentSport.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/sports" element={<StudentSport />} />        
      </Routes>
    </div>
  );
};

export default App;
