import React, { useState } from "react";
import axios from "axios";
import signupImageUrl from "../Pictures/signup.jpg";
import Header from "../Components/Header";
import "../css/SignUpPage.css";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [wantOffers, setWantOffers] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setGeneralError("Passwords do not match");
      return;
    }

    const user = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender,
      country: country,
      email: email,
      password: password,
    };

    try {
      // eslint-disable-next-line
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        user
      );
      setGeneralError("");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setEmailError("Email already registered");
      } else {
        setGeneralError("Error registering user");
      }
    }
  };

  return (
    <div>
      <Header imageUrl={signupImageUrl} />
      <div className="floating-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setGeneralError("");
            }}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfrimPassword(e.target.value);
              setGeneralError("");
            }}
            required
          />
          {emailError ? (
            <p className="error">{emailError}</p>
          ) : (
            generalError && <p className="error">{generalError}</p>
          )}

          <select
            value={wantOffers}
            onChange={(e) => setWantOffers(e.target.value)}
            required
          >
            <option value="">Do Want Offers From Us</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default App;
