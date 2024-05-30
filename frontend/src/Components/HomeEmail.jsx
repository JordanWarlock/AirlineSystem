import React, { useState } from "react";
import image from "../Pictures/email.png";
import "../css/HomeEmail.css"; // Make sure to import the CSS file
import axios from "axios";

const HomeEmail = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailData = { email: email };

    try {
      const response = await axios.post("http://localhost:5000/api/email", emailData);
      setGeneralError("");
       alert("Email successfully added!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setEmailError("Email already registered");
      } else {
        setGeneralError("Error registering email");
      }
    }
  };

  return (
    <div className="header-container">
      <header className="header-background" style={{ backgroundImage: `url(${image})` }}>
        <div className="header-content">
          <h2>Never miss an Offer</h2>
          <h5>Subscribe and be the first to receive our exclusive offers.</h5>
          <form onSubmit={handleSubmit}>
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
            {emailError && <p className="error">{emailError}</p>}
            <button>Subscribe</button>
          </form>
          {generalError && <p className="error">{generalError}</p>}
        </div>
      </header>
    </div>
  );
};

export default HomeEmail;
