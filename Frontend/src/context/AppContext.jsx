import { createContext } from "react";
import {toast} from "react-toastify";
import { useEffect, useState} from "react";
import axios from "axios";


export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol ='$'

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem("token")||false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getDoctors = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/doctors/doctorList`)
            if (response.status === 200) {
                setDoctors(response.data)
            }else {
                toast.error("Failed to fetch doctors")
            }
            
        } catch (error) {
            toast.error("Something went wrong while fetching doctors")
            console.log(error.message)
        }
    }

    useEffect(() => {
        getDoctors()
    }, [])

    const value = {
        currencySymbol,
        Doctors:doctors,
        setDoctors,
        token,
        backendUrl,
        setToken,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider