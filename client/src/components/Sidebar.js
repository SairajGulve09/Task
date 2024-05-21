 //Updated sidebar.js
 import React, { useEffect, useState } from 'react';
 const Sidebar = () => {
   // Placeholder data for profiles
   const [highlightedProfiles, setHighlightedProfiles] = useState([]);
   const [collaborations, setCollaborations] = useState([]);
   const [recentlyJoined, setRecentlyJoined] = useState([]);
 
   // Function to fetch highlighted profiles
   const fetchHighlightedProfiles = async () => {
     try {
       const response = await fetch('http://localhost:5000/highlighted-profiles');
       const data = await response.json();
       setHighlightedProfiles(data);
     } catch (error) {
       console.error('Error fetching highlighted profiles:', error);
     }
   };
 
   // Function to fetch collaborations
   const fetchCollaborations = async () => {
     try {
       const response = await fetch('/collaborations');
       const data = await response.json();
       setCollaborations(data);
     } catch (error) {
       console.error('Error fetching collaborations:', error);
     }
   };
 
   // Function to fetch recently joined profiles
   const fetchRecentlyJoined = async () => {
     try {
       const response = await fetch('http://localhost:5000/recently-joined');
       const data = await response.json();
       setRecentlyJoined(data);
     } catch (error) {
       console.error('Error fetching recently joined profiles:', error);
     }
   };
 
   // Fetch data on component mount
   useEffect(() => {
     fetchHighlightedProfiles();
     fetchCollaborations();
     fetchRecentlyJoined();
   }, []);
 
   return (
     <div className="right-0 top-25 h-25 w-64 bg-gray-200 p-4 overflow-y-auto">
       <div className="bg-white p-4 mb-4 rounded shadow">
   <h2 className="text-lg font-bold mb-2">Highlighted Profiles</h2>
   <ul>
     {highlightedProfiles.map(profile => (
       <li key={profile.profileId} className="flex items-center mb-2">
         <img src={profile.profilePhoto} alt={profile.username} className="w-12 h-12 rounded-full mr-2" />
         <div>
           <p className="font-bold">{profile.firstName} {profile.lastName}</p>
           <p className="text-sm text-gray-500">{profile.location}</p>
           <p className="text-sm text-gray-500">{profile.category}</p>
         </div>
       </li>
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
       <li key={profile.profileId} className="flex items-center mb-2">
         <img src={profile.profilePhoto} alt={profile.username} className="w-12 h-12 rounded-full mr-2" />
         <div>
           <p className="font-bold">{profile.firstName} {profile.lastName}</p>
           <p className="text-sm text-gray-500">{profile.location}</p>
           <p className="text-sm text-gray-500">{profile.category}</p>
         </div>
       </li>
     ))}
   </ul>
 </div>
     </div>
   );
 };
 
 export default Sidebar;
 