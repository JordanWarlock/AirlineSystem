import React, { useState, useEffect } from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import UserProfileHeader from "./UserProfileHeader";

const Header = ({ imageUrl }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <header style={{ backgroundImage: `url(${imageUrl})` }}>
      <nav>
        <div
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          &#9776;
        </div>
        {isSmallScreen && (
          <div className="logo">
            <Link to="/" className="link-logo-text">
              FLYEASE
            </Link>
          </div>
        )}
        <ul className={`menu ${menuOpen ? "open" : ""}`}>
          {!isSmallScreen && (
            <h1>
              <li>
                <Link to="/" className="link">
                  FLYEASE
                </Link>
              </li>
            </h1>
          )}
          <h2>
            <li>
              <Link to="/flightstatus" className="link">
                Track Flight
              </Link>
            </li>
            <li>
              <Link to="/help" className="link">
                Help
              </Link>
            </li>
          </h2>
          <h3>
            {sessionStorage.getItem("userInfo") ? (
              <li>
                <Link to="/profile" className="link">
                  <UserProfileHeader />
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="link">
                    Log In
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="link">
                    | Sign Up
                  </Link>
                </li>
              </>
            )}
          </h3>
        </ul>
      </nav>

      <div className="write">
        <h1>
          <ul>
            <li>Life Is Short And</li>
            <li>The World is Wide!</li>
          </ul>
        </h1>
        <h3>
          <ul>
            <li>
              To get the best of your adventure you just need to leave and
            </li>
            <li>go where you like. We are waiting for you.</li>
          </ul>
        </h3>
      </div>
      {!isSmallScreen && (
        <button className="button" type="submit">
          <Link to="/login" className="link">
            Try For Free
          </Link>
        </button>
      )}
    </header>
  );
};

export default Header;
