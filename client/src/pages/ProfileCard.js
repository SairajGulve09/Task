import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/profiles')
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="bg-gray-100 p-4">
      <div className="flex items-center">
        <img src={profile.profileImage} alt="Profile" className="w-16 h-16 rounded-full" />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{profile.fullname}</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Follow</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded ml-2">Chat</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
