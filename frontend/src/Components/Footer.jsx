import React from 'react';
import "../css/footer.css";
import bestImage from "../Pictures/bestlogo.png";
import faceImage from "../Pictures/facebook.png";
import twitImage from "../Pictures/twitter.png";
import instaImage from "../Pictures/instagram.png";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="left-section">
        <h2>About Our Team</h2>
        <h3>
          <ul>
            <li>M. Gulsher Khan</li>
            <li>M. Fawaz Khalid</li>
            <li>M. Abdul Raffay</li>
          </ul>
        </h3>
      </div>
        <img src={bestImage} alt="Best Img" className="bestImg" />
        <h4>World Best Agency Winner</h4>
      <div className="right-section">
        <h5>Let's Stay Connected</h5>
        <div className="social-icons">
          <a href="https://facebook.com">
            <img src={faceImage} alt="Facebook Logo" className="facebook" />
          </a>
          <a href="https://instagram.com">
            <img src={instaImage} alt="Instagram Logo" className="instagram" />
          </a>
          <a href="https://twitter.com">
            <img src={twitImage} alt="Twitter Logo" className="twitter" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
