import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Weather from './Weather';
import WeatherForecast from './weatherForecast';
import Header from './Header';
import AstroData from './AstroData';

const App = () => {
  // State variable to store the selected city
  const [city, setCity] = useState('');

  // Function to update the selected city
  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  // Function to clear the selected city
  const clearCity = () => {
    setCity('');
  };

  return (
    
    <Router>
      <div>
        <Header />
        {/* Define routes */}
        
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {/* Weather component with city change handler and clear city function */}
                <Weather onCityChange={handleCityChange} clearCity={clearCity} />
                {/* WeatherForecast component with selected city */}
                <WeatherForecast city={city} />
              </div>
            }
          />
          {/* Route for AstroData component */}
          <Route path="/AstroData" element={<AstroData />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
