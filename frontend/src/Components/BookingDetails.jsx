import React, { useState } from "react";
import "../css/BookingDetails.css"; // Import CSS for styling

const BookingDetails = ({ bookings }) => {
  const [expandedLegs, setExpandedLegs] = useState({});

  const toggleLegDetails = (bookingIndex, flightIndex, legIndex) => {
    const key = `${bookingIndex}-${flightIndex}-${legIndex}`;
    setExpandedLegs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="booking-details">
      {bookings.map((booking, bookingIndex) => {
        const { flight, bookingDateTime, price, currency } = booking;

        return (
          <div key={bookingIndex} className="booking-row">
            <div className="booking-info">
              <p>
                Booking Date: {new Date(bookingDateTime).toLocaleDateString()}
              </p>
              <p>
                Price: {price} {currency}
              </p>
            </div>
            {flight.map((flt, flightIndex) => {
              const { legs } = flt;
              const isReturnFlight = flight.length > 1;
              return (
                <div key={flightIndex} className="flight-row">
                  <div className="flight-header">
                    <h3>
                      {isReturnFlight
                        ? flightIndex === 0
                          ? "Outbound Flight"
                          : "Return Flight"
                        : "One-Way Flight"}
                    </h3>
                  </div>
                  {legs.map((leg, legIndex) => {
                    const {
                      departureAirport,
                      arrivalAirport,
                      departureTime,
                      arrivalTime,
                      flightInfo,
                      carriersData,
                    } = leg;

                    const key = `${bookingIndex}-${flightIndex}-${legIndex}`;
                    const isExpanded = expandedLegs[key];

                    return (
                      <div key={legIndex} className="leg-summary">
                        <div
                          className="leg-summary-header"
                          onClick={() =>
                            toggleLegDetails(
                              bookingIndex,
                              flightIndex,
                              legIndex
                            )
                          }
                        >
                          <p>Flight Number: {flightInfo.flightNumber}</p>
                          <img
                            src={carriersData[0].logo}
                            alt={carriersData[0].name}
                            className="carrier-logo"
                          />
                          <p>
                            {new Date(departureTime).toLocaleTimeString()} -{" "}
                            {departureAirport.cityName} ({departureAirport.code}
                            )
                          </p>
                          <p>
                            {new Date(arrivalTime).toLocaleTimeString()} -{" "}
                            {arrivalAirport.cityName} ({arrivalAirport.code})
                          </p>
                        </div>
                        {isExpanded && (
                          <div className="leg-details">
                            <div className="leg-info">
                              <div className="departure-info">
                                <p>Departure:</p>
                                <p>
                                  {new Date(departureTime).toLocaleTimeString()}{" "}
                                  - {departureAirport.cityName} (
                                  {departureAirport.code})
                                </p>
                              </div>
                              <div className="arrival-info">
                                <p>Arrival:</p>
                                <p>
                                  {new Date(arrivalTime).toLocaleTimeString()} -{" "}
                                  {arrivalAirport.cityName} (
                                  {arrivalAirport.code})
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default BookingDetails;
