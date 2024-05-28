import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import signupImageUrl from "../Pictures/signup.jpg";
import Footer from "../Components/Footer";
import "../css/LoginPage.css"; // Create a CSS file for styling

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const authenticateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });
      setErrorMessage(""); // Clear any previous error messages
      navigate("/"); // Navigate to the home page or another route upon successful login
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <Header imageUrl={signupImageUrl} />
      <div className="floating-form">
        <h1>Login</h1>
        <form onSubmit={authenticateUser}>
          <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <input 
            type="password" // Changed from "text" to "password" for security
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
