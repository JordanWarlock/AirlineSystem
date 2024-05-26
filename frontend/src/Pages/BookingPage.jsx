import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../css/BookingPage.css";
import Searchbar from "../Components/Searchbar";

const BookingPage = () => {
  const [selectedDestination, setSeletedDestination] = useState("");
  const [selectedDeparture, setSeletedDeparture] = useState("");
  const [flightType, setFlightType] = useState("OneWay");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (
      selectedDeparture !== "" &&
      selectedDestination !== "" &&
      departureDate !== ""
    ) {
      if (flightType === "OneWay") {
        try {
          const payload = {
            departureCode: selectedDeparture["code"],
            destinationCode: selectedDestination["code"],
            depDate: departureDate,
            passengerCount: 1,
            cabinClass: "ECONOMY",
          };
          const response = await axios.post(
            "http://localhost:5000/api/flightData/oneway",
            payload
          );
          navigate("/flightResults", {
            state: { flightResults: response.data },
          });
        } catch (err) {
          console.error(err);
        }
      } else if (flightType === "Return" && returnDate !== "") {
        try {
          const payload = {
            departureCode: selectedDeparture["code"],
            destinationCode: selectedDestination["code"],
            depDate: departureDate,
            retDate: returnDate,
            passengerCount: 1,
            cabinClass: "ECONOMY",
          };
          const response = await axios.post(
            "http://localhost:5000/api/flightData/return",
            payload
          );
          navigate("/flightResults", {
            state: { flightResults: response.data },
          });
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log("Fill all fields");
      }
    } else {
      console.log("Fill all fields");
    }
  };
  return (
    <div className="main-container">
      <select
        name="flight_type"
        id="type"
        onChange={(e) => {
          setFlightType(e.target.value);
        }}
      >
        <option value="OneWay">OneWay</option>
        <option value="Return">Return</option>
      </select>
      <Searchbar
        setSearchResult={setSeletedDeparture}
        icon="fa-solid fa-plane"
        placeHolder="From?"
      />
      <Searchbar
        setSearchResult={setSeletedDestination}
        icon="fa-solid fa-arrow-left"
        placeHolder="To?"
      />
      <input
        type="date"
        onChange={(e) => {
          setDepartureDate(e.target.value);
        }}
      />
      {flightType !== "OneWay" ? (
        <input
          type="date"
          onChange={(e) => {
            setReturnDate(e.target.value);
          }}
        ></input>
      ) : (
        <></>
      )}
      <button onClick={() => handleSearch()}>Search</button>
    </div>
  );
};

export default BookingPage;
