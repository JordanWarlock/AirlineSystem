import React from "react";
import "../css/UserProfileHeader.css";
const UserProfileHeader = () => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  return (
    <div className="user-summary">
      <img src="default_profile.png" alt="profile" />
      <h1>{userInfo.userName}</h1>
      <div
        className="link"
        onClick={() => {
          sessionStorage.removeItem("userInfo");
          window.location.href = "/";
        }}
      >
        | Log Out
      </div>
    </div>
  );
};

export default UserProfileHeader;
