import React, { useState } from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";

const Header = ({ imageUrl }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header style={{ backgroundImage: `url(${imageUrl})` }}>
      <nav>
        <ul className="main-nav">
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
              <Link to="/about" className="link">
                About
              </Link>
            </li>
            <li>
              <Link to="/help" className="link">
                Help
              </Link>
            </li>
            <li>
              <Link to="/flightstatus" className="link">
                Flight Status
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
                | Sign UP
              </Link>
            </li>
          </h3>
        </ul>
        <button className="mobile-menu-button" onClick={toggleMenu}>
          Menu
        </button>
        {menuOpen && (
          <div className="mobile-menu">
            <ul>
              <li>
                <Link to="/explore" className="link" onClick={toggleMenu}>
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/about" className="link" onClick={toggleMenu}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/help" className="link" onClick={toggleMenu}>
                  Help
                </Link>
              </li>
              <li>
                <Link to="/flightstatus" className="link" onClick={toggleMenu}>
                  Flight Status
                </Link>
              </li>
              <li>
                <Link to="/login" className="link" onClick={toggleMenu}>
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="link" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        )}
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
