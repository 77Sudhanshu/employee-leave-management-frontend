import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import LeaveRequests from "./pages/LeaveRequests";
import ApplyLeave from "./pages/ApplyLeave";
import MyLeaves from "./pages/MyLeaves";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />

        <Route path="/employees" element={<Employees />} />

        <Route path="/employees/add" element={<AddEmployee />} />

        <Route path="/employees/edit/:id" element={<EditEmployee />} />

        <Route path="/leave-requests" element={<LeaveRequests />} />

        <Route path="/profile" element={<Profile />} />

        <Route
          path="/apply-leave"
          element={<ApplyLeave />}
        />

        <Route
          path="/my-leaves"
          element={<MyLeaves />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;