import React, { useEffect, useState } from "react";
import axios from "axios";
const SearchResults = (props) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/search", {
          search_value: props.searchTerm,
        });
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    console.log(results);
    fetchData();
    // eslint-disable-next-line
  }, [props.searchTerm]);
  return props.searchTerm === "" ? (
    <></>
  ) : (
    <div className="result-container">
      {results.map((result, index) => (
        <div className="result-item" key={index}>
          <p>{result["name"] + " (" + result["code"] + ")"}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
