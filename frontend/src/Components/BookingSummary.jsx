import React from "react";
import "../css/BookingSummary.css"; // Import CSS for styling

const BookingSummary = ({ bookings }) => {
  const getLocaleDateTime = (dateTimeString) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const dateTimeObject = {
      date: new Date(dateTimeString).toLocaleDateString(),
      time: new Date(dateTimeString).toLocaleTimeString(undefined, options),
    };
    return dateTimeObject;
  };
  return (
    <div className="booking-details">
      {bookings.map((booking, bookingIndex) => {
        const { bookingDateTime, price, currency } = booking;
        const segments = booking.flight.segments;

        return (
          <div className="single-flight-data" key={bookingIndex}>
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
              <p className="price">{price + " " + currency}</p>
              <div className="bookingDateTime price">
                {getLocaleDateTime(bookingDateTime).date}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookingSummary;
