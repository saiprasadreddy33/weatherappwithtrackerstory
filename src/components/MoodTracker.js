import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './MoodTracker.css';

const MoodTracker = () => {
  const [mood, setMood] = useState('');
  const [moods, setMoods] = useState([]);
  const chartRef = useRef();

  const handleMoodChange = (event) => {
    setMood(event.target.value);
    console.log(Chart)
  };

  const handleMoodSubmit = () => {
    setMoods([...moods, { mood, date: new Date().toLocaleDateString() }]);
    setMood('');
  };

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }
  }, [moods]);

  const labels = moods.map(entry => entry.date);
  const moodData = moods.map(entry => entry.mood);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Mood',
        data: moodData,
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    aspectRatio: 1,
  };

  return (
    <div className="mood-tracker">
      <h2>Weather Mood Tracker</h2>
      <input
        type="text"
        value={mood}
        onChange={handleMoodChange}
        placeholder="Enter your mood"
      />
      <button onClick={handleMoodSubmit}>Submit</button>
      <div style={{ width: '300px', height: '300px' }}> {/* Adjust the size as needed */}
        <canvas id="myChart" width="80" height="0"></canvas> {/* Adjust the dimensions */}
        <Line data={data} options={chartOptions} ref={chartRef} />
      </div>
    </div>
  );
};

export default MoodTracker;
