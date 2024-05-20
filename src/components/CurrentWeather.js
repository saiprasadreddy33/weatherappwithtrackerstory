import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { FaTimes } from 'react-icons/fa';
import './CurrentWeather.css';

const CurrentWeather = () => {
  const [weather, setWeather] = useState(null);
  const [searchQuery, setSearchQuery] = useState('Hyderabad');
  const [suggestions, setSuggestions] = useState(['Chennai', 'Mumbai', 'Delhi', 'Bangalore']);
  const [error, setError] = useState('');
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=6f5adfbdc0cf49969896399a9fafd1da&units=metric`
        );
        setWeather(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching weather:', error);
        setError('Place not found. Please enter a valid place.');
      }
    };

    fetchWeather();
    const intervalId = setInterval(fetchWeather, 600000);

    return () => clearInterval(intervalId);
  }, [searchQuery]);

  useEffect(() => {
    const updateLocalTime = () => {
      if (weather && weather.timezone !== undefined) {
        const localTime = new Date(Date.now() + weather.timezone * 1000 - 5.5 * 3600 * 1000);
        setLocalTime(localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit',day:"numeric",month : 'long', year:'numeric'}));
      }
    };

    updateLocalTime();
    const timeIntervalId = setInterval(updateLocalTime, 1000);

    return () => clearInterval(timeIntervalId);
  }, [weather]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    console.log(setSuggestions)
  };

  const clearInput = () => {
    setSearchQuery('');
  };

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case 'Clear':
        return <WiDaySunny />;
      case 'Clouds':
        return <WiCloudy />;
      case 'Rain':
        return <WiRain />;
      case 'Snow':
        return <WiSnow />;
      case 'Thunderstorm':
        return <WiThunderstorm />;
      default:
        return null;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="current-weather-container">
      <h2>Current Weather</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter a place..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        {searchQuery && (
          <FaTimes className="clear-icon" onClick={clearInput} />
        )}
        <button className="search-button" onClick={() => setSearchQuery(searchQuery)}>
          Search
        </button>
      </div>
      <div className="suggestions">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="suggestion"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
      {error && <p className="error-message">{error}</p>}
      {weather ? (
        <div className="weather-info">
          <p className="city-name">{weather.name}</p>
          <div className="weather-details">
            <div className="details-left">
              <p className="temperature">{weather.main.temp}°C</p>
              <p className="description">{weather.weather[0].description}</p>
              <p className="humidity">Humidity: {weather.main.humidity}%</p>
              <p className="wind-speed">Wind Speed: {weather.wind.speed} m/s</p>
              <p className="sunrise">Sunrise: {formatTime(weather.sys.sunrise)}</p>
              <p className="sunset">Sunset: {formatTime(weather.sys.sunset)}</p>
              <p className="local-time">Local Time: {localTime}</p>
            </div>
            <div className="weather-icon">{getWeatherIcon(weather.weather[0].main)}</div>
          </div>
        </div>
      ) : (
        searchQuery && !error && <p>Loading...</p>
      )}
    </div>
  );
};

export default CurrentWeather;
