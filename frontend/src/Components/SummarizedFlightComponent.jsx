import React, { useState } from "react";
import DetailedFlightResult from "./DetailedFlightResult";
import "../css/SummarizedFlightResult.css";
import { useNavigate } from "react-router";
import { Alert, Snackbar } from "@mui/material";

const SummarizedFlightResult = ({ flight, rate, currency, noBook }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const {
    segments,
    priceBreakdown: { total },
  } = flight;

  const navigate = useNavigate();

  const handleAlertClose = () => {
    setAlertOpen(false);
    navigate("/login");
  };

  const getLocaleDateTime = (dateTimeString) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const dateTimeObject = {
      date: new Date(dateTimeString).toLocaleDateString(),
      time: new Date(dateTimeString).toLocaleTimeString(undefined, options),
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
  const handleBooking = async () => {
    try {
      if (userInfo) {
        const payload = {
          user: userInfo._id,
          flight: flight,
          price: getPrice(total),
          bookingDateTime: new Date(),
          currency: currency,
          status: "Booked",
        };

        navigate("/payment", { state: { bookingInfo: payload } });
      } else {
        setAlertOpen(true);
      }
    } catch (err) {
      if (err.response.status === 400) {
        alert("Booking failed");
      }
    }
  };

  return (
    <div className="single-flight-data-details">
      <div className="single-flight-data">
        <div className="carrier-data">
          {segments.map((segment, index) => (
            <div className="carrier-summary" key={index}>
              <img
                src={segment.legs[0].carriersData[0].logo}
                alt={segment.legs[0].carriersData[0].name}
              />
              <p>{segment.legs[0].carriersData[0].name}</p>
            </div>
          ))}
        </div>
        <div className="flight-times">
          {segments.map((segment, index) => (
            <div className="summary" key={index}>
              <div className="time-code">
                <span className="time">
                  {getLocaleDateTime(segment.departureTime).time}
                </span>
                <span className="airport-code">
                  {segment.legs[0].departureAirport.code}
                </span>
              </div>
              <div className="separator">
                {segment.legs.length === 1 ? <>direct</> : <>multi</>}
              </div>
              <div className="time-code">
                <span className="time">
                  {getLocaleDateTime(segment.arrivalTime).time}
                </span>
                <span className="airport-code">
                  {segment.legs[0].arrivalAirport.code}
                </span>
              </div>
              <div className="duration">
                {Math.floor(segment.totalTime / 3600)}h{" "}
                {Math.floor((segment.totalTime % 3600) / 60)}m
              </div>
            </div>
          ))}
        </div>
        <div className="price-actions">
          <p className="price">{getPrice(total) + " " + currency}</p>
          <button
            className="details-button"
            onClick={(e) => handleViewDetails(e)}
          >
            View Details
          </button>

          {!noBook && (
            <button className="details-button" onClick={handleBooking}>
              Book
            </button>
          )}
        </div>
      </div>
      <div className="details">
        {showDetails && (
          <DetailedFlightResult
            flight={flight}
            getPrice={getPrice}
            currency={currency}
          />
        )}
      </div>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Please Login to book. Redirecting....
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SummarizedFlightResult;
