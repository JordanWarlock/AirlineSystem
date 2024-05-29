import React from "react";

const UserProfilePage = () => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  return userInfo ? (
    <div>
      <h1>Profile Information</h1>
      <h2>Name : {userInfo.firstName + " " + userInfo.lastName}</h2>
      <h2>Age : {userInfo.age}</h2>
      <h2>Gender : {userInfo.gender}</h2>
      <h2>Email : {userInfo.email}</h2>
      <h2>Country : {userInfo.country}</h2>
    </div>
  ) : (
    <h1>Please log in to view your profile</h1>
  );
};

export default UserProfilePage;
