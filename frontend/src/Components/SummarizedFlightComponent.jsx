import React, { useState } from "react";
import DetailedFlightResult from "./DetailedFlightResult";
import "../css/SummarizedFlightResult.css";
const SummarizedFlightResult = ({ flight, rate, currency }) => {
  const [showDetails, setShowDetails] = useState(false);

  const {
    segments,
    priceBreakdown: { total },
  } = flight;

  const getLocaleDateTime = (dateTimeString) => {
    const dateTimeObject = {
      date: new Date(dateTimeString).toLocaleDateString(),
      time: new Date(dateTimeString).toLocaleTimeString(),
    };
    return dateTimeObject;
  };

  const getPrice = (total) => {
    const totalBasePrice = total.units + total.nanos / 1e9;
    const finalPrice = totalBasePrice * rate;
    return finalPrice.toFixed(0);
  };
  const handleViewDetails = (e) => {
    setShowDetails(!showDetails);
    if (showDetails === false) {
      e.target.innerHTML = "Hide Details";
    } else {
      e.target.innerHTML = "View Details";
    }
  };

  return (
    <div className="single-flight-data">
      {segments.map((segment, index) => (
        <div className="summary" key={index}>
          <div className="carrier-data">
            <img
              src={segment.legs[0].carriersData[0].logo}
              alt={segment.legs[0].carriersData[0].name}
            />
            <p>{segment.legs[0].carriersData[0].name}</p>
          </div>

          <p>{`${getLocaleDateTime(segment.departureTime).time} - ${
            getLocaleDateTime(segment.arrivalTime).time
          }`}</p>
          <p>
            {Math.floor(segment.totalTime / 3600)}h{":"}
            {Math.floor((segment.totalTime % 3600) / 60)}m
          </p>
        </div>
      ))}
      <p>{"Price : " + getPrice(total) + " " + currency}</p>
      <button onClick={(e) => handleViewDetails(e)}>View Details</button>
      {showDetails && (
        <div className="details">
          <DetailedFlightResult
            flight={flight}
            getPrice={getPrice}
            currency={currency}
          />
        </div>
      )}
    </div>
  );
};

export default SummarizedFlightResult;
