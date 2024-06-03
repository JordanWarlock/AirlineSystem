import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../css/BookingPage.css";
import Searchbar from "../Components/Searchbar";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  InputLabel,
  LinearProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const BookingPage = () => {
  const [selectedDestination, setSeletedDestination] = useState("");
  const [selectedDeparture, setSeletedDeparture] = useState("");
  const [flightType, setFlightType] = useState("OneWay");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengerCount, setPassengerCount] = useState(1);
  const [travelClass, setTravelClass] = useState("ECONOMY");
  const [searching, setSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (
      selectedDeparture !== "" &&
      selectedDestination !== "" &&
      departureDate !== ""
    ) {
      if (flightType === "OneWay") {
        try {
          setSearching(true);
          const payload = {
            departureCode: selectedDeparture["code"],
            destinationCode: selectedDestination["code"],
            depDate: departureDate.toISOString().split("T")[0],
            passengerCount: passengerCount,
            cabinClass: travelClass,
          };
          const response = await axios.post(
            "http://localhost:5000/api/flightData/oneway",
            payload
          );
          navigate("/flightResults", {
            state: { flightResults: response.data },
          });
        } catch (err) {
          setSearching(false);
          console.error(err);
        }
      } else if (flightType === "Return" && returnDate !== "") {
        try {
          const payload = {
            departureCode: selectedDeparture["code"],
            destinationCode: selectedDestination["code"],
            depDate: departureDate.toISOString().split("T")[0],
            retDate: returnDate.toISOString().split("T")[0],
            passengerCount: passengerCount,
            cabinClass: travelClass,
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
      setErrorMessage("Please fill all fields");
      console.log("Fill all fields");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="main-container">
        {searching && <LinearProgress color="secondary" />}
        <h1>Book here</h1>
        <FormControl>
          <FormLabel className="triphere">Trip Type</FormLabel>
          <RadioGroup
            row
            value={flightType}
            onChange={(e) => setFlightType(e.target.value)}
            className="radio-group"
          >
            <FormControlLabel
              value="OneWay"
              control={<Radio />}
              label="One Way"
            />
            <FormControlLabel
              value="Return"
              control={<Radio />}
              label="Return"
            />
          </RadioGroup>
        </FormControl>
        <div className="form-row search-bar-row">
          <Searchbar
            setSearchResult={setSeletedDeparture}
            icon="fa-solid fa-plane"
            placeHolder="From?"
            className="text-field "
          />
          <Searchbar
            setSearchResult={setSeletedDestination}
            icon="fa-solid fa-arrow-left"
            placeHolder="To?"
            className="text-field"
          />
        </div>
        <div className="form-row">
          <DatePicker
            label="Departure Date"
            value={departureDate}
            onChange={(newValue) => setDepartureDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} className="date-field" />
            )}
          />
          {flightType === "Return" && (
            <DatePicker
              label="Return Date"
              value={returnDate}
              onChange={(newValue) => setReturnDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} className="date-field" />
              )}
            />
          )}
        </div>
        <div className="form-row passenger-class-field">
          <FormControl fullWidth>
            <InputLabel>Passengers</InputLabel>
            <Select
              value={passengerCount}
              label="Passengers"
              onChange={(e) => setPassengerCount(e.target.value)}
            >
              {[...Array(10).keys()].map((num) => (
                <MenuItem key={num + 1} value={num + 1}>
                  {num + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Class</InputLabel>
            <Select
              value={travelClass}
              label="Class"
              onChange={(e) => setTravelClass(e.target.value)}
            >
              <MenuItem value="ECONOMY">Economy</MenuItem>
              <MenuItem value="BUSINESS">Business</MenuItem>
              <MenuItem value="FIRST">First</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="search-button">
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search flights
          </Button>
        </div>
        {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
      </div>
    </LocalizationProvider>
  );
};

export default BookingPage;
