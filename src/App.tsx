// src/App.tsx

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import EmployeeRegistration from "./pages/employeeregistration";
import MainLayout from "./components/mainLayout";
import UsersPage from "./pages/userspage";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<MainLayout />}>
        
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="employeeregistration" element={<EmployeeRegistration />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;