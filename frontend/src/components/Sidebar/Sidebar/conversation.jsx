// import React from 'react'
// import useConversation from '../../../zustand/useConversation.js';

// const Conversation= ({conversation , lastIdx , emoji}) => {
//   const {selectedConversation , setselectedConversation}= useConversation();

//   const isSelected = selectedConversation?._id === conversation._id;
//   return (
//     <>
//         <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer 
//             ${isSelected ? "bg-sky-500" : ""}
//         `}
//          onClick={() => setselectedConversation(conversation)}
//         >

//            {/* <div className="avatar offline">
//                 <div className="w-4 rounded-full">
//                     img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
//                 </div>
//             </div> */}
//             <div className="avatar online">
//                <div className="w-14 rounded-full">
//                     <img 
//                        src={conversation.profilePic}
//                        alt='user avatar'
//                     />   
//                </div>
//             </div>
            

//             <div>
//                 <div className='flex gap-20'>
//                     <p className='font-bold text-gray-200'>{conversation.fullName}</p>
//                     <span className='text-xl'>{emoji}</span>
//                 </div>
//             </div>
//         </div>

//        {!lastIdx && <div className='divider my-0 py-0 h-1'/>}
    
//     </>
//   )
// }

// export default Conversation;



// import React from 'react'

// const Conversation= () => {
//   return (
//     <>
//         <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer '>

//            {/* <div className="avatar offline">
//                 <div className="w-4 rounded-full">
//                     img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
//                 </div>
//             </div> */}
//             <div className="avatar online">
//                <div className="w-14 rounded-full">
//                     <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
//                </div>
//             </div>
            

//             <div>
//                 <div className='flex gap-20'>
//                     <p className='font-bold text-gray-200'>Rohan</p>
//                     <span className='text-xl'>@#$</span>
//                 </div>
//             </div>
//         </div>

//         <div className='divider my-0 py-0 h-1'></div>
    
//     </>
//   )
// }

// export default Conversation;



// // Final.
// import React from "react";
// import useConversation from "../../../zustand/useConversation.js";
// import { useSocketContext } from "../../../context/SocketContext.jsx";

// const Conversation = ({ conversation, lastIdx, emoji }) => {
//   const { selectedConversation, setSelectedConversation } = useConversation();

//   const isSelected = selectedConversation && selectedConversation?._id === conversation._id;

//   const {onlineUsers} = useSocketContext();
//   const isOnline = onlineUsers.inludes(conversation._id)

// //   console.log("Selected-Conversation-Id:",selectedConversation._id);
// //   console.log("Conversation-Id:",conversation._id);

//   return (
//     <>
//       <div
//         className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer 
          
//             // If any one user is selected then its background colour will change otherwise not
//             ${isSelected ? "bg-sky-500" : ""}
//         `}
//         onClick={() => setSelectedConversation(conversation)}
//       >
//         {/* User Avatar */}
//         <div className={`avatar ${isOnline ? "online" : ""}`}>
//           <div className="w-14 rounded-full">
//              <img 
//                 src={conversation.profilePic} 
//                 alt='user avatar' 
//              />
//           </div>
//         </div>

//         {/* User Info */}
//         <div className="flex-1 flex justify-between items-center">
//           <p className="font-bold text-gray-200">{conversation.fullName}</p>
//           <span className="text-xl">{emoji}</span>
//         </div>
//       </div>

//       {/* Divider for Separation */}
//       {!lastIdx && <div className="divider my-0 py-0 h-px bg-gray-600" />}
//     </>
//   );
// };

// export default Conversation;



// import React from "react";
// import useConversation from "../../../zustand/useConversation.js";
// import { useSocketContext } from "../../../context/SocketContext.jsx";

// const Conversation = ({ conversation, lastIdx, emoji }) => {
//   const { selectedConversation, setSelectedConversation } = useConversation();

//   const isSelected = selectedConversation && selectedConversation?._id === conversation._id;

//   const { onlineUsers } = useSocketContext();
//   const isOnline = onlineUsers.includes(conversation._id); // ✅ Fixed typo

//   return (
//     <>
//       <div
//         className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer 
//           ${isSelected ? "bg-sky-500" : ""}
//         `}
//         onClick={() => setSelectedConversation(conversation)}
//       >
//         {/* User Avatar */}
//         <div className={`avatar ${isOnline ? "online" : ""}`}>
//           <div className="w-14 rounded-full">
//              <img 
//                 src={conversation.profilePic} 
//                 alt="user avatar" 
//              />
//           </div>
//         </div>

//         {/* User Info */}
//         <div className="flex-1 flex justify-between items-center">
//           <p className="font-bold text-gray-200">{conversation.fullName}</p>
//           <span className="text-xl">{emoji}</span>
//         </div>
//       </div>

//       {/* Divider for Separation */}
//       {!lastIdx && <div className="divider my-0 py-0 h-px bg-gray-600" />}
//     </>
//   );
// };

// export default Conversation;

// import React from "react";
// import useConversation from "../../../zustand/useConversation.js";
// import { useSocketContext } from "../../../context/SocketContext.jsx";

// const Conversation = ({ conversation, lastIdx, emoji }) => {
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   const { onlineUsers } = useSocketContext();

//   const isSelected = selectedConversation?._id === conversation._id;
//   const isOnline = (onlineUsers ?? []).includes(conversation._id);

//   // Default profile image
//   // const defaultProfilePic = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";


//   const defaultProfilePics = [
//     "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//     "https://randomuser.me/api/portraits/men/1.jpg",
//     "https://randomuser.me/api/portraits/women/2.jpg",
//     "https://randomuser.me/api/portraits/men/3.jpg",
//     "https://randomuser.me/api/portraits/women/4.jpg",
//     "https://randomuser.me/api/portraits/men/5.jpg",
//     "https://randomuser.me/api/portraits/women/6.jpg",
//     "https://randomuser.me/api/portraits/men/7.jpg",
//     "https://randomuser.me/api/portraits/women/8.jpg",
//     "https://randomuser.me/api/portraits/men/9.jpg",
//     "https://randomuser.me/api/portraits/women/10.jpg",
//     "https://randomuser.me/api/portraits/men/11.jpg",
//     "https://randomuser.me/api/portraits/women/12.jpg",
//     "https://randomuser.me/api/portraits/men/13.jpg",
//     "https://randomuser.me/api/portraits/women/14.jpg",
//     "https://randomuser.me/api/portraits/men/15.jpg",
//     "https://randomuser.me/api/portraits/women/16.jpg",
//     "https://randomuser.me/api/portraits/men/17.jpg",
//     "https://randomuser.me/api/portraits/women/18.jpg",
//     "https://randomuser.me/api/portraits/men/19.jpg",
//     "https://randomuser.me/api/portraits/women/20.jpg"
//   ];
  
//   // Assign random default profile pic
//   const randomDefaultProfilePic = defaultProfilePics[Math.floor(Math.random() * defaultProfilePics.length)];
  

//   return (
//     <>
//       <div
//         className={`flex gap-2 items-center p-2 py-1 rounded cursor-pointer 
//           hover:bg-sky-500 ${isSelected ? "bg-sky-500" : ""}`}
//         onClick={() => setSelectedConversation(conversation)}
//       >
//         {/* User Avatar */}
//         <div className={`avatar ${isOnline ? "online" : ""}`}>
//           <div className="w-14 rounded-full">
//             <img
//               src={conversation.profilePic || randomDefaultProfilePic}
//               alt={`${conversation.fullName}'s avatar`}
//             />
//           </div>
//         </div>

//         {/* User Info */}
//         <div className="flex-1 flex justify-between items-center">
//           <p className="font-bold text-gray-200">{conversation.fullName}</p>
//           <span className="text-xl">{emoji}</span>
//         </div>
//       </div>

//       {/* Divider for Separation */}
//       {!lastIdx && <div className="divider my-0 py-0 h-px bg-gray-600" />}
//     </>
//   );
// };

// export default Conversation;


import React, { useState, useEffect } from "react";
import useConversation from "../../../zustand/useConversation.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";

const defaultProfilePics = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
  "https://randomuser.me/api/portraits/women/6.jpg",
  "https://randomuser.me/api/portraits/men/7.jpg",
  "https://randomuser.me/api/portraits/women/8.jpg",
  "https://randomuser.me/api/portraits/men/9.jpg",
  "https://randomuser.me/api/portraits/women/10.jpg",
  "https://randomuser.me/api/portraits/men/11.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
  "https://randomuser.me/api/portraits/men/13.jpg",
  "https://randomuser.me/api/portraits/women/14.jpg",
  "https://randomuser.me/api/portraits/men/15.jpg",
  "https://randomuser.me/api/portraits/women/16.jpg",
  "https://randomuser.me/api/portraits/men/17.jpg",
  "https://randomuser.me/api/portraits/women/18.jpg",
  "https://randomuser.me/api/portraits/men/19.jpg",
  "https://randomuser.me/api/portraits/women/20.jpg"
];

/**
 * Get a fixed profile picture for a user.
 * It remains the same until manually changed.
 */
const getFixedProfilePic = (userId) => {
  if (!userId) return defaultProfilePics[0]; // Fallback for missing ID

  // Check localStorage for an existing profile picture
  const storedPic = localStorage.getItem(`profilePic_${userId}`);
  if (storedPic) return storedPic;

  // Assign a new random profile pic
  const randomPic = defaultProfilePics[Math.floor(Math.random() * defaultProfilePics.length)];

  // Store the assigned picture in localStorage
  localStorage.setItem(`profilePic_${userId}`, randomPic);

  return randomPic;
};

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = (onlineUsers ?? []).includes(conversation._id);

  // State to store the profile picture
  const [profilePic, setProfilePic] = useState(conversation.profilePic || getFixedProfilePic(conversation._id));

  // If the user updates their profile picture, update the stored one
  useEffect(() => {
    if (conversation.profilePic) {
      setProfilePic(conversation.profilePic);
      localStorage.setItem(`profilePic_${conversation._id}`, conversation.profilePic);
    }
  }, [conversation.profilePic, conversation._id]);

  return (
    <>
      <div
        className={`flex gap-2 items-center p-2 py-1 rounded cursor-pointer 
          hover:bg-sky-500 transition-all duration-200 ease-in-out 
          ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        {/* User Avatar */}
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full overflow-hidden border border-gray-300">
            <img
              src={profilePic}
              alt={`${conversation.fullName}'s avatar`}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 flex justify-between items-center">
          <p className="font-bold text-gray-200 truncate">{conversation.fullName}</p>
          {emoji && <span className="text-xl">{emoji}</span>}
        </div>
      </div>

      {/* Divider for Separation */}
      {!lastIdx && <div className="divider my-0 py-0 h-px bg-gray-600" />}
    </>
  );
};

export default Conversation;
