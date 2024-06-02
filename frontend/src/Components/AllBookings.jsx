import React, { useState } from "react";
import SummarizedFlightResult from "./SummarizedFlightComponent";
import "../css/AllBookings.css";
const AllBookings = ({ bookings }) => {
  const resultsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = bookings.slice(indexOfFirstResult, indexOfLastResult);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const encryptObjectId = (objectId) => {
    const hexString = objectId.toString();

    const decimalNumber = parseInt(hexString.substring(0, 8), 16);

    const encryptedNumber = decimalNumber % 100000;

    return encryptedNumber;
  };

  //   const decryptToObjectId = (encryptedNumber) => {
  //     const hexString = encryptedNumber.toString().padStart(8, "0");

  //     return hexString;
  //   };
  return (
    <div>
      {currentResults.length === 0 ? (
        <h1>No bookings found</h1>
      ) : (
        currentResults.map((booking, index) => (
          <div
            key={index}
            className="single-booking-data"
            style={{
              padding: "10px",
              boxShadow: "0px 0px 5px black",
              margin: "10px 0px",
            }}
          >
            <div
              className="booking-info"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h2>Booking No: {encryptObjectId(booking._id)}</h2>
              <p style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                Status:
                <p
                  style={{
                    color: booking.status.includes("Booked") ? "green" : "red",
                  }}
                >
                  {booking.status}
                </p>
              </p>
              <p>
                Booking Date:{" "}
                {new Date(booking.bookingDateTime).toLocaleDateString()}
              </p>
            </div>
            <SummarizedFlightResult
              key={index}
              flight={booking.flight}
              rate={1}
              currency={booking.currency}
              currentPage={currentPage}
              resultsPerPage={resultsPerPage}
              nextPage={nextPage}
              previousPage={previousPage}
              noBook={true}
            />
          </div>
        ))
      )}
      <div className="pagination">
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={indexOfLastResult >= bookings.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllBookings;
