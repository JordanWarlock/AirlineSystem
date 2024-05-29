import React from "react";
import "../css/UserProfileHeader.css";
import { Link } from "react-router-dom";
const UserProfileHeader = () => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  return (
    <div className="user-summary">
      <img src="default_profile.png" alt="profile" />
      <h1>{userInfo.firstName + " " + userInfo.lastName}</h1>
      <Link
        to="/login"
        className="link"
        onClick={() => sessionStorage.removeItem("userInfo")}
      >
        | Log Out
      </Link>
    </div>
  );
};

export default UserProfileHeader;
