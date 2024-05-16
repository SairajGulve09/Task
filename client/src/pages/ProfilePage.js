import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  // Function to get userId from session or token
  const getUserIdFromSessionOrToken = () => {
    // Logic to retrieve userId from session or token
    // Replace this with your actual logic
    return '123'; // For example, return a hardcoded userId
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Logic to retrieve userId from session or token
        // Replace this with your actual logic
        const userId = getUserIdFromSessionOrToken();
  
        const response = await fetch(`http://localhost:5000/profiles/${userId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching profile data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      {error && <div className="text-red-500">{error}</div>}
      {profileData && <ProfileCard profile={profileData} />}
    </div>
  );
};

export default ProfilePage;
