import React from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";

const Header = ({ imageUrl }) => {
  return (
    <header style={{ backgroundImage: `url(${imageUrl})`}}>
      
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
                  Book
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link">
                  Help
                </Link>
              </li>
            </h2>
            <h3>
              <li>
                <Link to="/login" className="link">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="link">
                  | Sign Up
                </Link>
              </li>
            </h3>
          </ul>
        </nav>
      
      <div className="write">
      <h1>
        <ul>
        <li>Experience the ultimate in</li>
        <li>Premium travel</li>
      </ul>
      </h1>
      </div>
    </header>
  );
};

export default Header;
