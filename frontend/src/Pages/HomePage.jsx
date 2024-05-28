import React from "react";
import "../css/HomePage.css";
import Header from "../Components/Header";
import SignUpImage from "../Pictures/signup.jpg"

const HomePage = () => {
  return (
    <div>
      <Header imageUrl={SignUpImage} />
    </div>
  );
};

export default HomePage;
