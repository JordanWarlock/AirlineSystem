import React, { useState } from "react";

import "../css/BookingPage.css";
import SearchResults from "../Components/SearchResults";

const BookingPage = () => {
  const [input, setInput] = useState("");

  return (
    <div className="main-container">
      <div className="search-container">
        <div className="input-wrapper">
          <i className="fa fa-search"></i>
          <input
            type="text"
            className="input-field"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <SearchResults searchTerm={input} />
      </div>
    </div>
  );
};

export default BookingPage;
