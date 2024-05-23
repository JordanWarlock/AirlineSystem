import React from "react";
import "../css/HomePage.css";
import Header from "../Components/Header";
import SignUpImage from "../Pictures/h1-rom-lon-was-collage-hn.jpg"

const HomePage = () => {
  return (
    <div>
      <Header imageUrl={SignUpImage} />
    </div>
  );
};

export default HomePage;
