import { React, useEffect, useState } from "react";
import { useLocation } from "react-router";
import SummarizedFlightResult from "../Components/SummarizedFlightComponent";
import axios from "axios";
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import img from "../Pictures/signup.jpg"
import "../css/FlightResultPage.css"
import { Container } from "@mui/material";
const FlightResultPage = () => {
  const location = useLocation();
  const flightResults = location.state?.flightResults || {};
  const [currency, setCurrency] = useState("EUR");
  const [currentRate, setCurrentRate] = useState(1);
  const [allRates, setAllRates] = useState([]);

  const resultsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = flightResults.flightOffers.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const fetchRateFromDB = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/currencyRates"
      );
      console.log(response.data["rates"]);
      const rates = response.data["rates"];
      setAllRates(rates);
      for (const rate of Object.keys(rates)) {
        if (rate === currency) {
          setCurrentRate(rates[rate]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRateFromDB();
    // eslint-disable-next-line
  }, [currency]);
  return (
    <div>
          <Header imageUrl={img} />
              <Container>
                <div className="flight">
      <h1>Flight Results</h1>
      </div>
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        {Object.keys(allRates).map((rate, index) => (
          <option key={index} value={rate}>
            {rate}
          </option>
        ))}
      </select>
      {flightResults["error"] ? (
        <p>Sorry An Error Occured</p>
      ) : (
        currentResults.map((flight, index) => (
          <SummarizedFlightResult
            key={index}
            flight={flight}
            rate={currentRate}
            currency={currency}
            currentPage={currentPage}
            resultsPerPage={resultsPerPage}
            nextPage={nextPage}
            previousPage={previousPage}
            noBook={false}
          />
        ))
      )}
      <div className="pagination">
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={indexOfLastResult >= flightResults.flightOffers.length}
        >
          Next
        </button>
      </div>
    </Container>
      <Footer/>

    </div>
  );
};

export default FlightResultPage;
