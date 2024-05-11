import React, { useState } from "react";

import "../css/BookingPage.css";
import Searchbar from "../Components/Searchbar";

const BookingPage = () => {
  const [selectedDestination, setSeletedDestination] = useState("");
  const [selectedDeparture, setSeletedDeparture] = useState("");

  const handleSearch = () => {
    if (selectedDeparture === "") {
      console.log("departure doesnt exist");
    } else {
      console.log("departure exists");
    }
    if (selectedDestination === "") {
      console.log("destination doesnt exist");
    } else {
      console.log("destination exists");
    }
  };
  return (
    <div className="main-container">
      <Searchbar
        setSearchResult={setSeletedDeparture}
        icon="fa-solid fa-plane"
        placeHolder="From?"
      />
      <Searchbar
        setSearchResult={setSeletedDestination}
        icon="fa-solid fa-arrow-left"
        placeHolder="To?"
      />
      <button onClick={() => handleSearch()}>Search</button>
    </div>
  );
};

export default BookingPage;
