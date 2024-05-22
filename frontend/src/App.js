import "./App.css";
import BookingPage from "./Pages/BookingPage";
import HomePage from "./Pages/HomePage";
import ContactUsPage from "./Pages/ContactUsPage";
import FlightResultPage from "./Pages/FlightResultPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookingPage" element={<BookingPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/flightResults" element={<FlightResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
