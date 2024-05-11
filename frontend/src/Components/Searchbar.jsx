import React, { useState } from "react";
import SearchResults from "../Components/SearchResults";

const Searchbar = ({ icon, setSearchResult, placeHolder }) => {
  const [input, setInput] = useState("");
  return (
    <div className="search-container">
      <div className="input-wrapper">
        <i className={icon}></i>
        <input
          type="text"
          className="input-field"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder={placeHolder}
        />
      </div>
      <SearchResults
        searchTerm={input}
        handleResultSelection={setInput}
        selectedResult={setSearchResult}
      />
    </div>
  );
};

export default Searchbar;
