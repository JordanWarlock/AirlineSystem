import React from "react";
import "../css/DetailedFlightResult.css";

const DetailedFlightResult = ({ flight, currency, getPrice }) => {
  if (!flight) {
    return <div>Sorry, no flight details available.</div>;
  }

  return (
    <div class="flight-details">
      <h2>Flight Details</h2>
      {flight.segments.map((segment, segmentIndex) => (
        <div key={segmentIndex} className="segment-details">
          <h3>{segmentIndex === 0 ? <>Depart</> : <>Return</>}</h3>
          {segment.legs.map((leg, legIndex) => (
            <div key={legIndex} className="leg-details">
              <div className="leg-header">
                <img
                  src={leg.carriersData[0].logo}
                  alt={`${leg.carriersData[0].name} logo`}
                  className="airline-logo"
                />
                <div className="flight-number">
                  <strong>Flight Number:</strong> {leg.flightInfo.carrierInfo.operatingCarrier+" "+leg.flightInfo.flightNumber}
                </div>
              </div>
              <div className="flight-info">
                <div>
                  <strong>Departure:</strong>
                  {`${leg.departureAirport.cityName} (${leg.departureAirport.code})`}
                  at {new Date(leg.departureTime).toLocaleString()}
                </div>
                <div>
                  <strong>Arrival:</strong>
                  {`${leg.arrivalAirport.cityName} (${leg.arrivalAirport.code})`}
                  at {new Date(leg.arrivalTime).toLocaleString()}
                </div>
                <div>
                  <strong>Duration:</strong> {Math.floor(leg.totalTime / 3600)}h
                  {Math.floor((leg.totalTime % 3600) / 60)}m
                </div>
                <div>
                  <strong>Airline:</strong> {leg.carriersData[0].name}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="price-details">
        <h3>Price Breakdown</h3>
        <div>
          <strong>Total Price:</strong>
          {`${getPrice(flight.priceBreakdown.total)} ${currency}`}
        </div>
        <div>
          <strong>Base Fare:</strong>
          {`${getPrice(flight.priceBreakdown.baseFare)} ${currency}`}
        </div>
        <div>
          <strong>Taxes:</strong>
          {`${getPrice(flight.priceBreakdown.tax)} ${currency}`}
        </div>
      </div>
    </div>
  );
};

export default DetailedFlightResult;
