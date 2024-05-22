import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileCard = ({ profile }) => (
  <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
    <img className="w-32 h-32 rounded-full mx-auto" src={profile.profilePhoto}  alt="Profile picture" />
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

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/home-profiles')
      .then(response => {
        setProfiles(response.data);
        console.log("Profile list data: ",response.data);
      })
      .catch(error => {
        console.error('Error fetching profiles:', error);
      });
  }, []);

  return (
    <div className='flex flex-wrap'>
      {profiles.map(profile => (
        <ProfileCard key={profile.profileId} profile={profile} />
      ))}
    </div>
  );
};

export default ProfileList;
