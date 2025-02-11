import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import './Weather.css'; // Import the CSS file
import sunnyImage from './Assets/sunny.png'; // Image for Clear sky
import cloudyImage from './Assets/cloudy.png'; // Image for Clouds
import lightRainImage from './Assets/light_rain.png'; // Image for Light Rain
import rainyImage from './Assets/rainy.png'; // Image for Rain
import drizzleImage from './Assets/drizzle.png'; // Image for Drizzle
import thunderstormImage from './Assets/thunderstorm.png'; // Image for Thunderstorm
import mistImage from './Assets/mist.png'; // Image for Mist
import showerRainImage from './Assets/shower_rain.png'; // Image for Shower Rain
import defaultImage from './Assets/default.png'; // Default image (if weather condition is not matched)
import PlanetTable from './planetTable'; // Import the PlanetTable component
//weather function sets teh state of the city and weather data for latitude and longitude so it can be passed for 5 day forecast
const Weather = ({ onCityChange }) => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1ba5cef8465d89b81a184a3e2a1a0194`
      );
      const weatherResponse = response.data;
      setWeatherData(weatherResponse);
      console.log(weatherResponse); // You can see all the weather data in console log
      onCityChange(city);

      // Fetch geo coordinates
      const geoResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=1ba5cef8465d89b81a184a3e2a1a0194`
      );
      const geoData = geoResponse.data[0];
      const latitude = geoData.lat;
      const longitude = geoData.lon;

      // Set latitude and longitude
      setLatitude(latitude);
      setLongitude(longitude);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };
//gets the weather icon from the images in assets to match for the weather
  const getWeatherIcon = (weatherCondition, weatherDescription) => {
    switch (weatherCondition) {
      case 'Clear':
        return sunnyImage;
      case 'Clouds':
        return cloudyImage;
      case 'Rain':
        if (weatherDescription && weatherDescription.toLowerCase().includes('light rain')) {
          return lightRainImage;
        } else {
          return rainyImage;
        }
      case 'Drizzle':
        return drizzleImage;
      case 'Thunderstorm':
        return thunderstormImage;
      case 'Mist':
        return mistImage;
      case 'Shower Rain':
        return showerRainImage;
      default:
        return defaultImage;
    }
  };

 
// returns the outputs to display on the page
  return (
    <div className='weather-container'>
      <h1>Weather Forecast</h1>
      <form className='weather-form' onSubmit={handleSubmit}>
        <input
          className='weather-input'
          type="text"
          placeholder="Search Location..."
          value={city}
          onChange={handleInputChange}
        />
      </form>

      {weatherData && (
        <div className='weather-box-container'>
          <div className='weather-info'>
            <h2>Today</h2>
            <img
              className='weather-image'
              src={getWeatherIcon(weatherData.weather[0].main, weatherData.weather[0].description)}
              alt="Weather Icon"
            />
            <p><h1><b>{weatherData.name}</b></h1> {weatherData.main.temp}°C</p>
            {city && (
             <Link to="/AstroData"> <button className='info-btn'>Find Out More About Today</button></Link>

            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
