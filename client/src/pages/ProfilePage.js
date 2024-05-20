import React from 'react';
import ProfileList from '../components/ProfileList';

const ProfilePage = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-5">Profiles</h1>
      <ProfileList />
    </div>
  );
};

export default ProfilePage;
