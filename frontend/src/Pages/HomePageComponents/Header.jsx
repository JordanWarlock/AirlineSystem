import React from 'react';
import backgroundImage from "../../Pictures/h1-rom-lon-was-collage-hn.jpg"
import "../../css/Header.css"
import {Link} from "react-router-dom"


const Header = () => {
  return (
    <header style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '450px', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center',paddingLeft:"300px",color:"white" }}>
         <nav>
        <ul style={{ display: 'flex', listStyle: 'none', marginLeft: '100px', color:"white" }}>
          <h1>
            <li style={{ marginRight: '20px' }}><Link to="/"  style={{ textDecoration: 'none', color: 'white'}}>FLYEASE</Link></li>
         </h1>
          <h2 style={{ display: 'flex', listStyle: 'none', marginLeft: '100px', color:"white" }}>
            <li style={{ marginRight: '20px' }}><Link to="/explore"  style={{ textDecoration: 'none', color: 'white'}}>Explore</Link></li>
            <li style={{ marginRight: '20px' }}><Link to="/bookingPage" style={{ textDecoration: 'none', color: 'white'}}>Booking Page</Link></li>
            <li style={{ marginRight: '20px' }}><Link to="/about" style={{ textDecoration: 'none', color: 'white'}}>About</Link></li>
          </h2>
          </ul>
      </nav>
      </div>
      <nav>
       
        
      </nav>
    </header>
  );
}

export default Header;
