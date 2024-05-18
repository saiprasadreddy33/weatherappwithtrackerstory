import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './CurrentWeather';
import MoodTracker from './MoodTracker';
import UserStories from './UserStories';
import { WiDaySunny} from 'react-icons/wi';
import './HomeScreen.css'; // Import custom styles for HomeScreen

const HomeScreen = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          'https://api.unsplash.com/search/photos',
          {
            params: {
              query: ['sunny', 'cloudy', 'rainy', 'snowy', 'thunderstorm'][index],
              client_id: 'kFyLbUr18_GiWsp34Z_8zW9rgv_5dq5zV2XsGTIGJX4',
              per_page: 1,
            },
          }
        );
        setImages([response.data.results[0].urls.regular]);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();

    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex === 4 ? 0 : prevIndex + 1));
      fetchImages();
    }, 8000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="home-screen" style={{ backgroundImage: `url(${images[0]})` }}>
      <header className="header">
        <h1 className="title">Weather Dashboard</h1>
        <WiDaySunny className="weather-icon" />
      </header>
      <div className="dashboard-container">
        <div className="widget">
          <CurrentWeather />
        </div>
        <div className="widget">
          <MoodTracker />
        </div>
        <div className="widget">
          <UserStories />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
