import React, { useState } from "react";
import "../css/UserProfilePage.css";
import UserDashboard from "../Components/UserDashboard";
import { useNavigate } from "react-router-dom";
const UserProfilePage = () => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const [selectedLink, setSelectedLink] = useState(null);

  const navigate = useNavigate();

  const handleClick = (index) => {
    setSelectedLink(index);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userInfo");
    navigate("/");
  };

  return userInfo ? (
    <div className="user-profile-container">
      <aside className="user-sidebar">
        <div className="user-info">
          <img src="user_profile_image.png" alt="user profile" />
          <h2>{userInfo.firstName + " " + userInfo.lastName}</h2>
          <h4>{userInfo.email}</h4>
          <ul className="links">
            <li
              className={`link ${
                selectedLink === 0 ? "selected" : "not-selected"
              }`}
              onClick={() => handleClick(0)}
            >
              <i className="fa-solid fa-gauge"></i>
              <p>Dashboard</p>
            </li>
            <li
              className={`link ${
                selectedLink === 1 ? "selected" : "not-selected"
              }`}
              onClick={() => handleClick(1)}
            >
              <i className="fa-solid fa-plane"></i>
              <p>Bookings</p>
            </li>
          </ul>
        </div>

        <div className="logout link" onClick={() => handleLogout()}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <p>Log Out</p>
        </div>
      </aside>
      <section className="main-content">
        <UserDashboard />
      </section>
    </div>
  ) : (
    <h1>Please log in to view your profile</h1>
  );
};

export default UserProfilePage;
