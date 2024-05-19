import "./App.css";
import BookingPage from "./Pages/BookingPage";
import HomePage from "./Pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookingPage" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
