// import React, { useState } from "react";

// const UserProfile = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);

//   const handleProfileClick = () => {
//     setShowProfile(true);
//     setShowDropdown(false);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setProfileImage(imageUrl);
//     }
//   };

//   return (
//     <div className="relative inline-block text-left">
//       {/* Triple Dot Button */}
//       <button
//         onClick={() => setShowDropdown(!showDropdown)}
//         className="p-2 text-xl font-bold"
//       >
//         ⋮
//       </button>

//       {/* Dropdown Menu */}
//       {showDropdown && (
//         <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
//           <div className="py-1">
//             <button
//               onClick={handleProfileClick}
//               className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//             >
//               View Profile
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Profile Modal */}
//       {showProfile && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
//           <div className="bg-white p-6 rounded-lg w-80 shadow-xl">
//             <h2 className="text-xl font-bold mb-4">User Profile</h2>
//             <div className="flex items-center gap-4 mb-4">
//               <label htmlFor="profileUpload" className="cursor-pointer relative">
//                 <img
//                   src={profileImage || "https://via.placeholder.com/80"}
//                   alt="User"
//                   className="w-16 h-16 rounded-full object-cover"
//                 />
//                 <input
//                   type="file"
//                   id="profileUpload"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//                 <span className="absolute bottom-0 right-0 text-xs bg-gray-800 text-white px-1 py-0.5 rounded">
//                   ✎
//                 </span>
//               </label>
//               <div>
//                 <p className="text-lg font-semibold">John Doe</p>
//                 <p className="text-gray-600 text-sm">+1 234 567 8901</p>
//               </div>
//             </div>
//             <p className="text-sm text-gray-700">
//               Status: “Hey there! I am using ChatApp.”
//             </p>

//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={() => setShowProfile(false)}
//                 className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;


// import React, { useState } from "react";

// const UserProfile = () => {
//   const [showProfile, setShowProfile] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setProfileImage(imageUrl);
//     }
//   };

//   return (
//     <div className="text-left">
//       {/* Simple Profile Button */}
//       <button
//         onClick={() => setShowProfile(true)}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         View Profile
//       </button>

//       {/* Profile Modal */}
//       {showProfile && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
//           <div className="bg-white p-6 rounded-lg w-80 shadow-xl">
//             <h2 className="text-xl font-bold mb-4">User Profile</h2>
//             <div className="flex items-center gap-4 mb-4">
//               <label htmlFor="profileUpload" className="cursor-pointer relative">
//                 <img
//                   src={profileImage || "https://via.placeholder.com/80"}
//                   alt="User"
//                   className="w-16 h-16 rounded-full object-cover"
//                 />
//                 <input
//                   type="file"
//                   id="profileUpload"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//                 <span className="absolute bottom-0 right-0 text-xs bg-gray-800 text-white px-1 py-0.5 rounded">
//                   ✎
//                 </span>
//               </label>
//               <div>
//                 <p className="text-lg font-semibold">John Doe</p>
//                 <p className="text-gray-600 text-sm">+1 234 567 8901</p>
//               </div>
//             </div>
//             <p className="text-sm text-gray-700">
//               Status: “Hey there! I am using ChatApp.”
//             </p>

//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={() => setShowProfile(false)}
//                 className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;


// import React, { useState, useEffect } from "react";

// const UserProfile = () => {
//   const [profileImage, setProfileImage] = useState(null);
//   const [showProfile, setShowProfile] = useState(true); // Auto-show profile modal on render

//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setProfileImage(imageUrl);
//     }
//   };

//   return (
//     <>
//       {/* Profile Modal */}
//       {showProfile && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
//           <div className="bg-white p-6 rounded-lg w-80 shadow-xl">
//             <h2 className="text-xl font-bold mb-4">User Profile</h2>
//             <div className="flex items-center gap-4 mb-4">
//               <label htmlFor="profileUpload" className="cursor-pointer relative">
//                 <img
//                   src={profileImage || "https://via.placeholder.com/80"}
//                   alt="User"
//                   className="w-16 h-16 rounded-full object-cover"
//                 />
//                 <input
//                   type="file"
//                   id="profileUpload"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//                 <span className="absolute bottom-0 right-0 text-xs bg-gray-800 text-white px-1 py-0.5 rounded">
//                   ✎
//                 </span>
//               </label>
//               <div>
//                 <p className="text-lg font-semibold">John Doe</p>
//                 <p className="text-gray-600 text-sm">+1 234 567 8901</p>
//               </div>
//             </div>
//             <p className="text-sm text-gray-700">
//               Status: “Hey there! I am using ChatApp.”
//             </p>

//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={() => setShowProfile(false)}
//                 className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UserProfile;

import React, { useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [showProfile, setShowProfile] = useState(true);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const res = await axios.post("http://localhost:5000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Image uploaded:", res.data);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  return (
    <>
      {showProfile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg w-80 shadow-xl">
            <h2 className="text-xl font-bold mb-4">User Profile</h2>
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="profileUpload" className="cursor-pointer relative">
                <img
                  src={profileImage || "https://via.placeholder.com/80"}
                  alt="User"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <input
                  type="file"
                  id="profileUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span className="absolute bottom-0 right-0 text-xs bg-gray-800 text-white px-1 py-0.5 rounded">
                  ✎
                </span>
              </label>
              <div>
                <p className="text-lg font-semibold">John Doe</p>
                <p className="text-gray-600 text-sm">Mob-No : </p>
              </div>
            </div>
            <p className="text-sm text-gray-700">
              Status: “Hey there! I am using ChatApp.”
            </p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowProfile(false)}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
