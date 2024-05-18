import React, { useState } from 'react';
import './UserStories.css'; // Import custom styles for UserStories

const UserStories = () => {
  const [stories, setStories] = useState([]);
  const [story, setStory] = useState('');

  const handleStoryChange = (event) => {
    setStory(event.target.value);
  };

  const handleStorySubmit = () => {
    setStories([...stories, { story, date: new Date().toLocaleDateString() }]);
    setStory('');
  };

  return (
    <div className="user-stories">
      <h2>User Stories</h2>
      <textarea
        value={story}
        onChange={handleStoryChange}
        placeholder="Share your weather experience"
      />
      <button onClick={handleStorySubmit}>Submit</button>
      <ul>
        {stories.map((entry, index) => (
          <li key={index}>{`${entry.date}: ${entry.story}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserStories;
