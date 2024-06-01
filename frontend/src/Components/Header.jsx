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
                <Link to="/contact" className="link" onClick={toggleMenu}>
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
            <li>Life Is Short And</li>
            <li>The Wold is Wide!</li>
          </ul>
        </h1>
      <h3>
        <ul>
          <li>
            To get the best of your adventure you just need to  leave and
          </li>
          <li>
            go where you like. We are waiting for you.
          </li>
        </ul>
      </h3>
      </div>
          <button className="button" type="submit">
            <Link to="/signup" className="link">
            Try For Free
            </Link>
            </button>
    </header>
  );
};

export default Header;
