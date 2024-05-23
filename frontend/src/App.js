import "./App.css";
import BookingPage from "./Pages/BookingPage";
import HomePage from "./Pages/HomePage";
import ContactUsPage from "./Pages/ContactUsPage";
import SignUpPage from "../src/Pages/SignUpPage";
import FlightResult from "../src/Pages/FlightResultPage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookingPage" element={<BookingPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/flightresult" element={<FlightResult />} />
      </Routes>
    </Router>
  );
}

export default App;
