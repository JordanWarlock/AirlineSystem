import React, { useState } from 'react';
import Header from '../Components/Header';
import headerimage from "../Pictures/h1-rom-lon-was-collage-hn.jpg"
import '../css/FlightStatus.css';
import axios from 'axios';

const FlightStatus = () => {
    
    const [flightNumber, setFlightNumber] = useState('');
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [flightDetails, setFlightDetails] = useState(null);
    const [carrierCode, setCarrierCode] = useState("");
    

    const handleSearch = async() => {
        // Fetch flight details based on searchType, flightNumber, route, and date
        // For now, we'll mock the flight details response
        try{
        const details = {
            flightNumber: flightNumber,
            carrierCode: carrierCode,
            departureDate: date,
          
        };
        const response = await axios.post("http://localhost:5000/api/flighstatus" , details) 
        setFlightDetails(response.data);
        console.log(response.data)
    }
    catch(err){console.error(err)}
    };

    return (
        <div>
          <Header imageUrl={headerimage} />
          <div className="flight-status">
            <h1>Flight Status</h1>
            <p>Check the status of any Emirates flight, and sign up for future alerts.</p>
            <div className="input-group">
              <input
                type="text"
                placeholder="Flight number"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Carrier Code"
                value={carrierCode}
                onChange={(e) => setCarrierCode(e.target.value)}
              />
            </div>
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
                <table>
                  <tbody>
                    <tr>
                      <td>Flight Number:</td>
                      <td>{flightDetails.data.flightId}</td>
                    </tr>
                    <tr>
                      <td>Status:</td>
                      <td>{flightDetails.data.status.status}</td>
                    </tr>
                    <tr>
                      <td>Departure:</td>
                      <td>{flightDetails.data.departureAirport.name}</td>
                    </tr>
                    <tr>
                      <td>Arrival:</td>
                      <td>{flightDetails.data.arrivalAirport.name}</td>
                    </tr>
                    <tr>
                      <td>Flight Duration:</td>
                      <td>{flightDetails.data.additionalFlightInfo.flightDuration}</td>
                    </tr>
                    <div className="last-updated"><td>{flightDetails.data.status.lastUpdatedText}</td></div>
                  </tbody>
                </table>
              </div>
            )}
            
          </div>
        </div>
      );
    };

export default FlightStatus;
