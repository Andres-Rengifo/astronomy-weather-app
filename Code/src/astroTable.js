import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather2.css';
import sunnyImage from './Assets/sunny.png';
import cloudyImage from './Assets/cloudy.png';
import lightRainImage from './Assets/light_rain.png';
import rainyImage from './Assets/rainy.png';
import drizzleImage from './Assets/drizzle.png';
import thunderstormImage from './Assets/thunderstorm.png';
import mistImage from './Assets/mist.png';
import showerRainImage from './Assets/shower_rain.png';
import defaultImage from './Assets/default.png';
import sunriseImage from './Assets/sunrise.png';
import sunsetImage from './Assets/sunset.png';
import moonriseImage from './Assets/moonrise.png';
import moonsetImage from './Assets/moonset.png';
import PlanetTable from './planetTable';
import AstronomyModule from './astronomyModule';

const Weather2 = ({ onCityChange }) => {
  // State variables for managing data
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [moonData, setMoonData] = useState(null);
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [starGazingOptimal, setStarGazingOptimal] = useState('');

  // Effect hook to fetch astronomy data when latitude and longitude change
  useEffect(() => {
    if (latitude && longitude) {
      fetchAstronomyData();
    }
  }, [latitude, longitude]);

  // Effect hook to calculate star gazing conditions when moonData and sunrise change
  useEffect(() => {
    if (moonData && sunrise) {
      const moonriseTime = new Date(`2024-03-21 ${moonData.moonrise}`);
      const sunriseTime = new Date(`2024-03-21 ${sunrise}`);
      const timeDifference = (moonriseTime.getTime() - sunriseTime.getTime()) / (1000 * 60 * 60); // in hours

      if (timeDifference < 9) {
        setStarGazingOptimal('Not optimal');
      } else if (timeDifference < 10) {
        setStarGazingOptimal('Fair conditions');
      } else {
        setStarGazingOptimal('Optimal conditions');
      }
    }
  }, [moonData, sunrise]);

  // Function to fetch astronomy data
  const fetchAstronomyData = async () => {
    try {
      const response = await axios.get('https://api.ipgeolocation.io/astronomy', {
        params: {
          apiKey: 'e4c7b9448c694ef89768b0acf5ac27db',
          lat: latitude,
          long: longitude
        }
      });

      const { sunrise, sunset, moonrise, moonset } = response.data;
      setSunrise(sunrise);
      setSunset(sunset);
      setMoonData({ moonrise, moonset });
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1ba5cef8465d89b81a184a3e2a1a0194`
      );
      const weatherResponse = response.data;
      setWeatherData(weatherResponse);
      onCityChange(city);
//second api call to get geolocation to see which planet is the most visible as well as moon and sun 
      const geoResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=1ba5cef8465d89b81a184a3e2a1a0194`
      );
      const geoData = geoResponse.data[0];
      const latitude = geoData.lat;
      const longitude = geoData.lon;

      setLatitude(latitude);
      setLongitude(longitude);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle input change in the form
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  // Function to get weather icon based on weather condition
  const getWeatherIcon = (weatherCondition, weatherDescription) => {
    switch (weatherCondition) {
      case 'Clear':
        return defaultImage;
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
      case 'Sunny':
        return sunnyImage;
      default:
        return defaultImage;
    }
  };

  // Function to calculate star gazing duration
  const calculateStarGazingDuration = () => {
    const moonriseTime = new Date(`2024-03-21 ${moonData.moonrise}`);
    const sunriseTime = new Date(`2024-03-21 ${sunrise}`);
    const timeDifference = (moonriseTime.getTime() - sunriseTime.getTime()) / (1000 * 60 * 60); // in hours
    return timeDifference.toFixed(2) + ' hours';
  };
  
  // Rendering JSX
  return (
    <div className='weather-container'>
      <form className='weather-form' onSubmit={handleSubmit}>
        <input
          className='weather-input'
          type="text"
          placeholder="Enter a Location..."
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
              src={getWeatherIcon(weatherData.weather[0].main)}
              alt="Weather Icon"
            />
            <p> <h1><b>{weatherData.name}</b></h1> {weatherData.main.temp}°C</p>
          </div>
        </div>
      )}

      {moonData && (
        <div className='moon-data'>
          <p><img src={moonriseImage} alt="Moonrise" /> Moon Rise: {moonData.moonrise}</p>
          <p><img src={moonsetImage} alt="Moonset" /> Moon Set: {moonData.moonset}</p>
          <p><img src={sunriseImage} alt="Sunrise" /> Sunrise: {sunrise}</p>
          <p><img src={sunsetImage} alt="Sunset" /> Sunset: {sunset}</p>
        </div>
      )}

      {starGazingOptimal && (
        <div className="star-gazing-info">
          Star Gazing: {starGazingOptimal}
          <div className="star-gazing-duration">Duration: {calculateStarGazingDuration()}</div>
        </div>
      )}

      {latitude && longitude && <AstronomyModule lat={latitude} lon={longitude} />}
    </div>
  );
};

export default Weather2;

