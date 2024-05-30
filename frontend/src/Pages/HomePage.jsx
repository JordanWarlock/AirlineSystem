import React from "react";
import "../css/HomePage.css";
import Header from "../Components/Header";
import SignUpImage from "../Pictures/signup.jpg"
import BookingPage from "../Pages/BookingPage"
import MainPageComponent from "../Components/MainPageComponent";

const HomePage = () => {
  return (
    <div>
      <Header imageUrl={SignUpImage} />
      <BookingPage/>
      <MainPageComponent/>
    </div>
  );
};

export default HomePage;
