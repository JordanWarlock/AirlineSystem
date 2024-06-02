import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import headerimage from "../Pictures/h1-rom-lon-was-collage-hn.jpg";
import '../css/ExplorePage.css';
import axios from 'axios';

const ExplorePage = () => {
    const [cities, setCities] = useState([]);
    

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/topCities');
                setCities(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCities();
    }, []);

    
    return (
        <div>
            <Header imageUrl={headerimage} />
            <div className="explore">
                <h1>Explore Top Cities</h1>
                <div className="city-grid">
                    {cities.map(city => (
                        <div key={city.code} className="city-card" onClick={() => (city.code)}>
                            <img src={city.imageUrl} alt={city.name} />
                            <div className="city-name">{city.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
