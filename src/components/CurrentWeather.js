import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import './CurrentWeather.css';

const CurrentWeather = () => {
  const [weather, setWeather] = useState(null);
  const [searchQuery, setSearchQuery] = useState('Chennai');
  const [suggestions, setSuggestions] = useState(['Hyderabad', 'Mumbai', 'Delhi', 'Bangalore']);
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
    const intervalId = setInterval(fetchWeather, 600000); // Fetch every 10 minutes

    return () => clearInterval(intervalId);
  }, [searchQuery]);

  useEffect(() => {
    const updateLocalTime = () => {
      if (weather && weather.timezone !== undefined) {
        const localTime = new Date(Date.now() + weather.timezone * 1000);
        setLocalTime(localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    };

    updateLocalTime();
    const timeIntervalId = setInterval(updateLocalTime, 1000); // Update every second

    return () => clearInterval(timeIntervalId);
  }, [weather]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
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
        <div>
          <p>{weather.name}</p>
          <div className="weather-details">
            <div>
              <p>{weather.main.temp}°C</p>
              <p>{weather.weather[0].description}</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
              <p>Sunrise: {formatTime(weather.sys.sunrise)}</p>
              <p>Sunset: {formatTime(weather.sys.sunset)}</p>
              <p>Local Time: {localTime}</p>
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
