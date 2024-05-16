import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSettingPage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    profilePhoto: '',
    username: '',
    fullName: '',
    email: '',
    location: '',
    socialMediaIds: [],
    phoneNumber: '',
    shortDescription: '',
    oneLineDescription: '',
   
  });

  useEffect(() => {
    // Fetch user data from the backend
    fetchUserData();
  }, []); // Dependency array is empty to ensure it only runs once on component mount

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in local storage');
      }
  
      const response = await fetch('http://localhost:5000/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const userData = await response.json();
      setProfileData(prevProfileData => ({
        ...prevProfileData,
        ...userData,
      }));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSocialMediaIdsChange = (e, index) => {
    const newSocialMediaIds = [...profileData.socialMediaIds];
    newSocialMediaIds[index] = e.target.value;
    setProfileData({ ...profileData, socialMediaIds: newSocialMediaIds });
  };

  const handleAddSocialMediaId = () => {
    setProfileData({
      ...profileData,
      socialMediaIds: [...profileData.socialMediaIds, '']
    });
  };

  const handleSave = () => {
    // Serialize socialMediaIds array into a string
    const serializedSocialMediaIds = profileData.socialMediaIds.join(', ');

    // Create a copy of profileData and replace socialMediaIds array with the serialized string
    const updatedProfileData = {
      ...profileData,
      socialMediaIds: serializedSocialMediaIds
    };

    // Send updatedProfileData to backend for saving
    fetch('http://localhost:5000/profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfileData),
    })
    .then(response => {
      if (response.ok) {
        console.log('Profile data saved successfully');
        navigate('/')
        // Optionally, you can navigate to another page or show a success message here
      } else {
        console.error('Failed to save profile data:', response.statusText);
        // Optionally, you can show an error message to the user here
      }
    })
    .catch(error => {
      console.error('Error saving profile data:', error);
      // Optionally, you can show an error message to the user here
    });
  };

  const inputClasses = 'mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 dark:bg-zinc-600 dark:text-white';

  return (
    <div className="bg-zinc-100 dark:bg-white-800 min-h-screen">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-zinc-800 dark:black-white mb-4">Profile Settings</h1>
        
        <div className="bg-white dark:bg-zinc-700 shadow-md rounded-lg p-4 mb-4">
          <div className="flex items-center mb-4">
            <img src="https://placehold.co/150" alt="Profile Photo" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <label htmlFor="profilePhoto" className="block text-sm font-medium text-zinc-700 dark:text-white">Profile Photo</label>
              <input type="file" id="profilePhoto" name="profilePhoto" className={inputClasses} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-zinc-700 dark:text-white">Username</label>
              <input type="text" id="username" name="username" className={inputClasses} />
            </div>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-zinc-700 dark:text-white">Full Name</label>
              <input type="text" id="fullName" name="fullName" className={inputClasses} />
            </div>
          </div>

          <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-white mt-4">Email</label>
          <input type="email" id="email" name="email" className={inputClasses} />

          <label htmlFor="location" className="block text-sm font-medium text-zinc-700 dark:text-white mt-4">Location</label>
          <input type="text" id="location" name="location" className={inputClasses} />

          <div className="mt-4">
            <label htmlFor="socialMedia" className="block text-sm font-medium text-zinc-700 dark:text-white">Social Media IDs</label>
            <div className="grid grid-cols-1 gap-2" id="socialMedia">
              <input type="text" name="socialMedia" className={inputClasses} placeholder="Social Media ID" />
            </div>
            <button onClick={handleAddSocialMediaId} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Add Social Media ID</button>
          </div>

          <label htmlFor="phoneNumber" className="block text-sm font-medium text-zinc-700 dark:text-white mt-4">Phone Number</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" className={inputClasses} />

          <label htmlFor="shortDescription" className="block text-sm font-medium text-zinc-700 dark:text-white mt-4">Short Description</label>
          <textarea id="shortDescription" name="shortDescription" rows="3" className={inputClasses}></textarea>

          <label htmlFor="oneLineDescription" className="block text-sm font-medium text-zinc-700 dark:text-white mt-4">One Line Description</label>
          <input type="text" id="oneLineDescription" name="oneLineDescription" className={inputClasses} />
        </div>

        <div className="mt-4 flex justify-end">
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
};


export default ProfileSettingPage;
