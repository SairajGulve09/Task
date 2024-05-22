import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage
      const response = await axios.get(`http://localhost:5000/profile/${profileId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Fixed template string syntax
          'Content-Type': 'application/json'
        }
      });
        setProfile(response.data);
        console.log("Profile data: ",profile);
        setLoading(false);
      } catch (err) {
        setError('Error fetching profile data');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  return (
    <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
      <img className="w-32 h-32 rounded-full mx-auto" src={`http://localhost:5000/${profile.profilePhoto}`} alt="Profile picture" />
      <h2 className="text-center text-2xl font-semibold mt-3">{profile.firstName} {profile.lastName}</h2>
      <p className="text-center text-gray-600 mt-1">
        {profile.category === 'businessman' ? profile.businessType : profile.contentType}
      </p>
      <div className="flex justify-center mt-5">
        {profile.socialMediaIds && Object.entries(profile.socialMediaIds).map(([platform, link], index) => (
          <a key={index} href={link} className="text-blue-500 hover:text-blue-700 mx-3">{platform}</a>
        ))}
      </div>
      <div className="mt-5">
        <h3 className="text-xl font-semibold">Bio</h3>
        <p className="text-gray-600 mt-2">{profile.email} - {profile.location}</p>
        <p className="text-gray-600 mt-2">
          {profile.category === 'businessman' ? `${profile.businessCategory} - ${profile.businessLocation}` : `Followers: ${profile.followers}`}
        </p>
      </div>
    </div>
  );
}

export default Profile;
