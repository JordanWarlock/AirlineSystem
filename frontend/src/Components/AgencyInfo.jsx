import React from 'react';
import image from "../Pictures/agency.jpeg";
import "../css/AgencyInfo.css";

const AgencyInfo = () => {
  return (
    <div>
      <h2>
        <div className='orange'>
            About
        </div>
        Our Agency
      </h2>
      <div className="info-row">
        <h4>
          Welcome to FlyEase Travels, your trusted partner in air travel planning and booking.
          Established in 2010, we have dedicated over a decade to simplifying the process of
          finding and purchasing airline tickets for travelers around the globe. Our mission is to provide
          seamless, reliable, and cost-effective travel solutions tailored to meet the diverse needs of 
          our customers.
        </h4>
        <img src={image} alt="agency" className="agency-image" />
      </div>
    </div>
  )
}

export default AgencyInfo;
