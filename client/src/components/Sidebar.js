import React from 'react';

const Sidebar = () => {
  // Placeholder data for profiles
  const highlightedProfiles = [
    { id: 1, name: 'John Doe', profession: 'Developer' },
    { id: 2, name: 'Jane Smith', profession: 'Designer' },
    { id: 3, name: 'Alice Johnson', profession: 'Engineer' }
  ];

  const collaborations = [
    { id: 1, name: 'Company A', role: 'Software Engineer' },
    { id: 2, name: 'Company B', role: 'UX Designer' },
    { id: 3, name: 'Company C', role: 'Data Scientist' }
  ];

  const recentlyJoined = [
    { id: 1, name: 'New User 1', role: 'Frontend Developer' },
    { id: 2, name: 'New User 2', role: 'Backend Developer' },
    { id: 3, name: 'New User 3', role: 'Full Stack Developer' }
  ];

  return (
    <div className="fixed right-0 top-25 h-25 w-64 bg-gray-200 p-4 overflow-y-auto">
      <div className="bg-white p-4 mb-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Highlighted Profiles</h2>
        <ul>
          {highlightedProfiles.map(profile => (
            <li key={profile.id}>{profile.name} - {profile.profession}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-4 mb-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Collaborations</h2>
        <ul>
          {collaborations.map(profile => (
            <li key={profile.id}>{profile.name} - {profile.role}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-4 mb-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Recently Joined</h2>
        <ul>
          {recentlyJoined.map(profile => (
            <li key={profile.id}>{profile.name} - {profile.role}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
