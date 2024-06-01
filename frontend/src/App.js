import "./App.css";
import BookingPage from "./Pages/BookingPage";
import HomePage from "./Pages/HomePage";
import Help from "./Pages/Help";
import SignUpPage from "../src/Pages/SignUpPage";
import FlightResult from "../src/Pages/FlightResultPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import UserProfilePage from "./Pages/UserProfilePage";
import FlightStatus from "./Pages/FlightStatus";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookingPage" element={<BookingPage />} />
        <Route path="/help" element={<Help />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/flightResults" element={<FlightResult />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/flightstatus" element={<FlightStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
