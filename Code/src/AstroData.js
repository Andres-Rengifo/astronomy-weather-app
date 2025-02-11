import React, { useState } from 'react';
import MyComponent from './planetPos.js';
import PlanetTable from './planetTable.js';
import Weather from './Weather';
import Weather2  from './astroTable.js';
import './AstroData.css'

const AstroData = () => {
  // State to store the selected city
  const [city, setCity] = useState('');

  // Function to handle city change
  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  return (
    <div>
      <h1>AstroData Page</h1>
      {/* Weather2 component for displaying weather data and handling city change */}
      <Weather2 onCityChange={handleCityChange} />
    </div>
  );
};

export default AstroData;
