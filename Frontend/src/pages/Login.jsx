import React from "react";
import { useContext,useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const [state, setState] = React.useState("Sign Up");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const { token, setToken, backendUrl } = useContext(AppContext);

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      if (state === "Sign Up") {
        const response =await axios.post(`${backendUrl}/api/users/register`, {name, email, password});
        if (response.status === 201) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          toast.success("User registered successfully");
        }
        else {
          toast.error(response.data.message || "Registration failed");
        }
      } else {
        const response =await axios.post(`${backendUrl}/api/users/login`, { email, password });
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          toast.success("User logged in successfully");
          
        }
        else {
          console.log(response);
          
          toast.error(response.data.message || "Login failed");

        }
      }

    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("An error occurred. Please try again later.");
    }

  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  },[token]);

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
        </p>
        {state === "Sign Up" ? (
          <div className="w-full ">
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
              required
            />
          </div>
        ) : null}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button type="submit" className="bg-primary text-white w-full py-2 my-2 rounded-md text-base">
          {state === "Sign Up" ? "Create account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create an new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
