import React from 'react';
import "../css/HomePageComponent.css";
import worldImage from "../Pictures/World.png";
import main1 from "../Pictures/main1.avif";
import main2 from "../Pictures/main2.avif";
import main3 from "../Pictures/main3.avif";

const MainPageComponent = () => {
  return (
    <div className='main-component'>
      <div className='pictures'>
        <h2>
          <div className='orange'>
            Our
          </div>
          Destinations
        </h2>
        
        <div className="image-grid">
             <div className='overlayImg'>
              <img src={worldImage} alt="Overlay" className="overlay-image" />
            </div>
          <div className='background-image large-image'>
            <img src={main1} alt="Main 1" className="image1" />
          
          <div className='row2'>
            <img src={main2} alt="Main 2" className="image2" />
            <img src={main3} alt="Main 3" className="image3" />
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPageComponent;
