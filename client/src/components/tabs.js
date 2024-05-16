import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tabs() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/profiles'); // Assuming your backend is running on the same domain
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  return (
    <div>
      <h1></h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            <p>Name: {profile.name}</p>
            <p>Occupation: {profile.occupation}</p>
            {/* Add more profile details here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tabs;
