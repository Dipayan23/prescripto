import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/admin/all-doctors`, {
        headers: { Authorization: aToken },
      });
      //console.log("Response :", response);

      if (response.status === 200) {
        setDoctors(response.data.doctors);
        console.log("Doctors fetched successfully:", response.data.doctors);
      } else {
        toast.error(response.data.message || "Failed to fetch doctors");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Failed to fetch doctors");
    }
  };

  const changeAvailability = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        { id },
        {
          headers: { Authorization: aToken },
        }
      );
      if (response.status === 200) {
        toast.success("Doctor availability updated successfully");
        getAllDoctors(); // Refresh the list of doctors
      } else {
        toast.error(response.data.message || "Failed to update availability");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    getAllDoctors,
    doctors,
    changeAvailability
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
