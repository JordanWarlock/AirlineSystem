import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SummarizedFlightResult from './SummarizedFlightComponent';
import axios from 'axios';

const AdminBookings = ({ bookings }) => {
    const resultsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentBookings, setCurrentBookings] = useState(bookings); // State for bookings
    const [selectedBooking, setSelectedBooking] = useState(null);

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = currentBookings.slice(indexOfFirstResult, indexOfLastResult);

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const encryptObjectId = (objectId) => {
        const hexString = objectId.toString();
        const decimalNumber = parseInt(hexString.substring(0, 8), 16);
        const encryptedNumber = decimalNumber % 100000;
        return encryptedNumber;
    };

    const handleBookingClick = (booking) => {
        setSelectedBooking(booking);
    };

    const handleCloseModal = () => {
        setSelectedBooking(null);
    };

    const handleStatusChange = async (newStatus, bookingId) => {
        try {
            const payload = {
                bookId: bookingId,
                newStatus: newStatus
            };
            console.log(payload);
            const response = await axios.put("http://localhost:5000/api/admin/updateBookingStatus", payload);
            if (response.status === 200) {
                // Update the bookings state with the new status
                const updatedBookings = currentBookings.map(booking =>
                    booking._id === bookingId ? { ...booking, status: newStatus } : booking
                );
                setCurrentBookings(updatedBookings);
                handleCloseModal();
            }
        } catch (err) {
            console.error(err);
        }
    };

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
                            cursor: "pointer" // Add cursor pointer to indicate clickability
                        }}
                        onClick={() => handleBookingClick(booking)} // Open modal on click
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

            {/* Modal for displaying booking details and status change */}
            <Modal
                open={!!selectedBooking}
                onClose={handleCloseModal}
                aria-labelledby="booking-details-modal"
                aria-describedby="modal displaying booking details and status change"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& .MuiPaper-root': {
                        backgroundColor: 'white' // Set background color to white
                    }
                }}
            >
                <div
                    sx={{
                        backgroundColor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        width: 400,
                        outline: 'none'
                    }}
                >
                    <h2>Booking Details</h2>
                    {selectedBooking && (
                        <div>
                            <p>Booking ID: {selectedBooking._id}</p>
                            <p>Status: {selectedBooking.status}</p>
                            <Button variant="contained" color="primary" onClick={() => handleStatusChange('Booked', selectedBooking._id)}>
                                Change Status to Booked
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => handleStatusChange('Cancelled', selectedBooking._id)}>
                                Change Status to Cancelled
                            </Button>
                        </div>
                    )}
                </div>
            </Modal>

            <div className="pagination">
                <button onClick={previousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button
                    onClick={nextPage}
                    disabled={indexOfLastResult >= currentBookings.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminBookings;
