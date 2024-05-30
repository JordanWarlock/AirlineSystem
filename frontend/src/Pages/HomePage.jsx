import React from "react";
import "../css/HomePage.css";
import Header from "../Components/Header";
import SignUpImage from "../Pictures/signup.jpg"
import BookingPage from "../Pages/BookingPage"

const HomePage = () => {
  return (
    <div>
      <Header imageUrl={SignUpImage} />
      <BookingPage/>
    </div>
  );
};

export default HomePage;
