import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/CityFlights.css';

const CityFlights = () => {
    const { cityCode } = useParams();  // useParams hook to get the city code from URL
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/flights/${cityCode}`);
                setFlights(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchFlights();
    }, [cityCode]);

    return (
        <div className="city-flights">
            <h1>Flights Departing from {cityCode}</h1>
            <div className="flight-list">
                {flights.map(flight => (
                    <div key={flight.flightNumber} className="flight-card">
                        <p>Flight Number: {flight.flightNumber}</p>
                        <p>Destination: {flight.destination}</p>
                        <p>Departure Time: {flight.departureTime}</p>
                        <p>Arrival Time: {flight.arrivalTime}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CityFlights;