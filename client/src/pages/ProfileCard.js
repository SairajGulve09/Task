// import React from 'react';

// const ProfileCard = ({ profile }) => (
//   <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
//     <img className="w-32 h-32 rounded-full mx-auto" src={profile.profilePhoto} alt="Profile picture" />
//     <h2 className="text-center text-2xl font-semibold mt-3">{profile.firstName} {profile.lastName}</h2>
//     <p className="text-center text-gray-600 mt-1">
//       {profile.category === 'businessman' ? profile.businessType : profile.contentType}
//     </p>
//     <div className="flex justify-center mt-5">
//         {socialMediaIds && Object.keys(socialMediaIds).length > 0 ? (
//           Object.entries(socialMediaIds).map(([platform, link]) => (
//             <a key={platform} href={link} className="text-blue-500 hover:text-blue-700 mx-3">{platform}</a>
//           ))
//         ) : (
//           <p>No social media links available</p>
//         )}
//       </div>

//     <div className="mt-5">
//       <h3 className="text-xl font-semibold">Bio</h3>
//       <p className="text-gray-600 mt-2">{profile.email} - {profile.location}</p>
//       <p className="text-gray-600 mt-2">
//         {profile.category === 'businessman' ? `${profile.businessCategory} - ${profile.businessLocation}` : `Followers: ${profile.followers}`}
//       </p>
//     </div>
//   </div>
// );

// export default ProfileCard;
