import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProfileForm = () => {
  const [profileData, setProfileData] = useState({
    profilePhoto: '',
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    category: '',
    otherCategory: '',
    businessCategory: '',
    businessSubcategory: '',
    Gender: '',
    businessStrength: '',
    influencerCategory: '',
    influencerSubcategory: '',
    followers: 0,
    socialMediaIds: {
      linkedin: '',
      facebook: '',
      instagram: '',
      twitter: '',
    },
    oneLineDescription: '',
    shortDescription: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['linkedin', 'facebook', 'instagram', 'twitter'].includes(name)) {
      setProfileData({
        ...profileData,
        socialMediaIds: {
          ...profileData.socialMediaIds,
          [name]: value,
        },
      });
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage
      const response = await axios.post('http://localhost:5000/create-profile', profileData, {
        headers: {
          Authorization: `Bearer ${token}`, // Fixed template string syntax
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      navigate("/");
      alert('Profile created successfully!');
    } catch (error) {
      console.error('There was an error creating the profile!', error);
      alert('Failed to create profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={profileData.firstName}
            onChange={handleChange}
            autoComplete="given-name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={profileData.lastName}
            onChange={handleChange}
            autoComplete="family-name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={profileData.email}
            onChange={handleChange}
            autoComplete="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={profileData.location}
            onChange={handleChange}
            autoComplete="address-level1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={profileData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          >
            <option value="">Select Category</option>
            <option value="businessman">Businessman</option>
            <option value="influencer">Influencer</option>
            <option value="other">Other</option>
          </select>
        </div>
        {profileData.category === 'businessman' && (
          <>
            <div>
              <label htmlFor="businessLocation" className="block text-sm font-medium text-gray-700">
                Business Location
              </label>
              <input
                type="text"
                name="businessLocation"
                id="businessLocation"
                value={profileData.businessLocation}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label htmlFor="businessCategory" className="block text-sm font-medium text-gray-700">
                Business Category
              </label>
              <input
                type="text"
                name="businessCategory"
                id="businessCategory"
                value={profileData.businessCategory}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label htmlFor="businessSubcategory" className="block text-sm font-medium text-gray-700">
                Business Subcategory
              </label>
              <input
                type="text"
                name="businessSubcategory"
                id="businessSubcategory"
                value={profileData.businessSubcategory}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
              />
            </div>
          </>
        )}
        {profileData.category === 'influencer' && (
          <>
            <div>
              <label htmlFor="contentType" className="block text-sm font-medium text-gray-700">
                Content Type
              </label>
              <input
                type="text"
                name="contentType"
                id="contentType"
                value={profileData.contentType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label htmlFor="followers" className="block text-sm font-medium text-gray-700">
                Followers
              </label>
              <input
                type="number"
                name="followers"
                id="followers"
                value={profileData.followers}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label htmlFor="influencerCategory" className="block text-sm font-medium text-gray-700">
                Influencer Category
              </label>
              <input
                type="text"
                name="influencerCategory"
                id="influencerCategory"
                value={profileData.influencerCategory}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label htmlFor="influencerSubcategory" className="block text-sm font-medium text-gray-700">
                Influencer Subcategory
              </label>
              <input
                type="text"
                name="influencerSubcategory"
                id="influencerSubcategory"
                value={profileData.influencerSubcategory}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
              />
            </div>
          </>
        )}
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <input
            type="text"
            name="linkedin"
            id="linkedin"
            value={profileData.socialMediaIds.linkedin}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
            Facebook
          </label>
          <input
            type="text"
            name="facebook"
            id="facebook"
            value={profileData.socialMediaIds.facebook}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
            Instagram
          </label>
          <input
            type="text"
            name="instagram"
            id="instagram"
            value={profileData.socialMediaIds.instagram}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
            Twitter
          </label>
          <input
            type="text"
            name="twitter"
            id="twitter"
            value={profileData.socialMediaIds.twitter}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="oneLineDescription" className="block text-sm font-medium text-gray-700">
            One Line Description
          </label>
          <input
            type="text"
            name="oneLineDescription"
            id="oneLineDescription"
            value={profileData.oneLineDescription}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
            Short Description
          </label>
          <textarea
            name="shortDescription"
            id="shortDescription"
            rows="3"
            value={profileData.shortDescription}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          ></textarea>
        </div>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Profile
        </button>
      </div>
    </form>
  );
};

export default CreateProfileForm;
