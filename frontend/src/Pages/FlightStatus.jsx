import React, { useState } from 'react';
import Header from '../Components/Header';
import headerimage from "../Pictures/h1-rom-lon-was-collage-hn.jpg"
import '../css/FlightStatus.css';

const FlightStatus = () => {
    const [searchType, setSearchType] = useState('flightNumber');
    const [flightNumber, setFlightNumber] = useState('');
    const [route, setRoute] = useState({ from: '', to: '' });
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [flightDetails, setFlightDetails] = useState(null);

    const handleSearch = () => {
        // Fetch flight details based on searchType, flightNumber, route, and date
        // For now, we'll mock the flight details response
        const details = {
            flightNumber: 'EK123',
            status: 'On Time',
            departure: '10:00 AM',
            arrival: '02:00 PM'
        };
        setFlightDetails(details);
    };

    return (
        <div>
            <Header imageUrl={headerimage} />
            <div className="flight-status">
                <h1>Flight Status</h1>
                <p>Check the status of any Emirates flight, and sign up for future alerts.</p>
                <div className="search-options">
                    <button onClick={() => setSearchType('flightNumber')} className={searchType === 'flightNumber' ? 'active' : ''}>Flight number</button>
                    <button onClick={() => setSearchType('route')} className={searchType === 'route' ? 'active' : ''}>Route</button>
                </div>
                {searchType === 'flightNumber' ? (
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="Flight number" 
                            value={flightNumber} 
                            onChange={(e) => setFlightNumber(e.target.value)} 
                        />
                    </div>
                ) : (
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="Leaving from" 
                            value={route.from} 
                            onChange={(e) => setRoute({ ...route, from: e.target.value })} 
                        />
                        <input 
                            type="text" 
                            placeholder="Going to" 
                            value={route.to} 
                            onChange={(e) => setRoute({ ...route, to: e.target.value })} 
                        />
                    </div>
                )}
                <div className="input-group">
                    <input 
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                    />
                </div>
                <button onClick={handleSearch} className="view-details">View details</button>
                {flightDetails && (
                    <div className="flight-details">
                        <h2>Flight Details</h2>
                        <p>Flight Number: {flightDetails.flightNumber}</p>
                        <p>Status: {flightDetails.status}</p>
                        <p>Departure: {flightDetails.departure}</p>
                        <p>Arrival: {flightDetails.arrival}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlightStatus;
