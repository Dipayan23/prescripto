import React from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import AllApointment from "./pages/admin/AllApointment";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorsList from "./pages/admin/DoctorsList";

const App = () => {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className="bg-[#F8F9FE]">
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        {/* Your routes or components for the admin dashboard go here */}
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllApointment />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
