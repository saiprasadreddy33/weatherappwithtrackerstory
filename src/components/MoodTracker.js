import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { addMood } from '../slices/moodSlice';
import './MoodTracker.css';

const MoodTracker = () => {
  const [mood, setMood] = useState('');
  const moods = useSelector((state) => state.mood.moods);
  const dispatch = useDispatch();
  const chartRef = useRef();

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  const handleMoodSubmit = () => {
    if (mood) {
      dispatch(addMood({ mood, date: new Date().toLocaleDateString() }));
      setMood('');
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  }, [moods]);

  const labels = moods.map((entry) => entry.date);
  const moodData = moods.map((entry) => entry.mood);

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
      <div style={{ width: '300px', height: '300px' }}>
        <Line data={data} options={chartOptions} ref={chartRef} />
      </div>
    </div>
  );
};

export default MoodTracker;
