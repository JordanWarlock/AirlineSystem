import React from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container">
        <nav>
          <ul>
            <h1>
              <li>
                <Link to="/" className="link">
                  FLYEASE
                </Link>
              </li>
            </h1>
            <h2>
              <li>
                <Link to="/explore" className="link">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/bookingPage" className="link">
                  Booking Page
                </Link>
              </li>
              <li>
                <Link to="/about" className="link">
                  About
                </Link>
              </li>
            </h2>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
