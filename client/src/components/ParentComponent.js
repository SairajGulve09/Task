import React, { useState, useEffect } from 'react';
import ProfilePage from '../pages/ProfilePage';
import ProfileSettings from '../pages/profile-settings'; // Correct import statement

function ParentComponent() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch profile data asynchronously
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      // Fetch profile data from the server
      const response = await fetch('http://localhost:5000/profiles');
      if (response.ok) {
        const data = await response.json();
        // Set the fetched profile data
        setProfile(data);
      } else {
        console.error('Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleSaveProfile = async () => {
    // Update the profile data after saving in ProfileSettings
    await fetchProfileData();
  };

  return (
    <div>
      {profile ? (
        <ProfilePage profile={profile} /> 
      ) : (
        <p>Loading profile data...</p>
      )}
      <ProfileSettings onSaveProfile={handleSaveProfile} /> 
    </div>
  );
}

export default ParentComponent;
