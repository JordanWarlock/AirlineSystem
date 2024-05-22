import React from "react";
import { useLocation } from "react-router";
const FlightResultPage = () => {
  const location = useLocation();
  const flightResults = location.state?.flightResults || {};
  return (
    <div>
      {flightResults["error"] ? (
        <div>Sorry, an error occured</div>
      ) : (
        <div>{flightResults["aggregation"]["totalCount"]}</div>
      )}
    </div>
  );
};

export default FlightResultPage;
