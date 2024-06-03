import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css"; // Create a CSS file for styling
import { Switch } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpAge, setSignUpAge] = useState(0);
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const authenticateUser = async (e) => {
    e.preventDefault();
    if (checked) {
      try {
        // eslint-disable-next-line
        const response = await axios.post(
          "http://localhost:5000/api/admin/login",
          {
            email,
            password,
          }
        );
        setErrorMessage("");
        navigate("/admin");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Invalid email or password");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      }
    } else {
      try {
        const response = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
        });

        sessionStorage.setItem(
          "userInfo",
          JSON.stringify(response.data["user"])
        );
        setErrorMessage("");
        navigate("/");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Invalid email or password");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      }
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      signUpPassword !== signUpConfirmPassword ||
      signUpPassword === "" ||
      signUpConfirmPassword === "" ||
      signUpEmail === "" ||
      signUpUsername === "" ||
      signUpAge === 0
    ) {
      setErrorMessage("Please Fix Errors in Form");
      return;
    }

    const user = {
      userName: signUpUsername,
      age: signUpAge,
      email: signUpEmail,
      password: signUpPassword,
    };

    try {
      // eslint-disable-next-line
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        user
      );
      sessionStorage.setItem("userInfo", JSON.stringify(user));
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Email already registered");
      } else {
        setErrorMessage("Error registering user");
      }
    }
  };
  return (
    <div>
      <div
        className={
          isLoginMode ? "auth-container" : "auth-container sign-up-mode"
        }
      >
        <div className="forms-container">
          <div className="signin-signup">
            <form
              className="sign-in-form"
              onSubmit={(e) => authenticateUser(e)}
            >
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div
                className="input-field"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <p>Admin ?</p>
              </div>
              <input type="submit" value="Login" className="btn solid" />
              {errorMessage && (
                <span style={{ color: "red" }}>{errorMessage}</span>
              )}
            </form>
            <form
              className="sign-up-form"
              style={!isLoginMode ? { width: "100%" } : { width: "0%" }}
              onSubmit={(e) => handleSignUp(e)}
            >
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  value={signUpUsername}
                  onChange={(e) => setSignUpUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="number"
                  placeholder="Age"
                  value={signUpAge}
                  onChange={(e) => setSignUpAge(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={signUpConfirmPassword}
                  onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <input type="submit" className="btn" value="Sign up" />
              {errorMessage && <span>{errorMessage}</span>}
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Join us now to explore and get started. Create your account.
              </p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={() => setIsLoginMode(false)}
              >
                Sign up
              </button>
            </div>
            <img src="log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>Welcome back! Sign in to access your account.</p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={() => setIsLoginMode(true)}
              >
                Sign in
              </button>
            </div>
            <img src="register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
