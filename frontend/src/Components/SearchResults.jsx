import React, { useEffect, useState } from "react";
import axios from "axios";
const SearchResults = ({
  searchTerm,
  handleResultSelection,
  selectedResult,
}) => {
  const [results, setResults] = useState([]);
  const [resultSelected, setResultSelected] = useState("");

  const onResultSelection = (result) => {
    handleResultSelection(result["name"]); // Setting result's name as input field value
    setResultSelected(result["name"]);
    selectedResult(result["name"]);
    setResults([]);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/search", {
          search_value: searchTerm,
        });
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    console.log(results);
    fetchData();
    if (searchTerm !== resultSelected) {
      setResultSelected("");
      selectedResult("");
    }
    // eslint-disable-next-line
  }, [searchTerm]);
  return searchTerm === "" || resultSelected !== "" ? (
    <></>
  ) : (
    <div className="result-container">
      {results.map((result, index) => (
        <div
          className="result-item"
          key={index}
          onClick={() => onResultSelection(result)}
        >
          <p>{result["name"] + " (" + result["code"] + ")"}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
