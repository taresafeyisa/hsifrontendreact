import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import MainLayout from "./components/mainLayout";
import { ThemeProvider } from "./components/theme-provider";
import User from "./pages/Users/user";
import Employee from "./pages/employee";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employee" element={<Employee />} />

            <Route path="user" element={<User />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
