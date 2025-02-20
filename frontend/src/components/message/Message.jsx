import React from 'react';
import { useAuthContext } from '../../context/AuthContext.jsx';
import useConversation from '../../zustand/useConversation.js';
import { extractTime } from '../../utils/extractTime.js';

const Message = ({ message }) => {
   const { authUser } = useAuthContext();
   const { selectedConversation } = useConversation();

   // Determine if the message is sent by the authenticated user
   const fromMe = message?.sender?._id === authUser?._id;

   // Format the timestamp
   const formattedTime = extractTime(message?.createdAt);

   // Its means if message is send by me then it will be in starting otherwise its in ending.
   const chatClassName = fromMe ? 'chat-start' : 'chat-end';

   // Default profile picture
   const defaultAvatarPic = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

   // Determine profile pictures
   const senderProfilePic = message?.sender?.profilePic;
   const receiverProfilePic = selectedConversation?.profilePic || defaultAvatarPic;

   // Use the correct profile picture based on the sender
   const profilePic = fromMe ? authUser.profilePic || senderProfilePic : receiverProfilePic;

   // Determine message bubble background color
   const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-700';

   // Extract message content safely
   const messageContent = typeof message?.message === 'string' 
       ? message.message 
       : "No message content";

   // Apply shake animation if needed
   const shakeClass = message?.shouldShake ? "shake" : "";

   return (
     <div className={`chat ${chatClassName}`}>
        {/* Avatar Section */}
        <div className="chat-image avatar">
           <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
              <img 
                 alt="User Avatar" 
                 src={profilePic} 
                 className="w-full h-full object-cover" 
              />
           </div>
        </div>

        {/* Message Bubble */}
        <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
           {messageContent}
        </div>

        {/* Timestamp */}
        <time className="text-xs opacity-50">{formattedTime}</time>
     </div>
   );
};

export default Message;


// import React from 'react';
// import { useAuthContext } from '../../context/AuthContext.jsx';
// import useConversation from '../../zustand/useConversation.js';
// import { extractTime } from '../../utils/extractTime.js';

// const Message = ({ message }) => {
//    const { authUser } = useAuthContext();
//    const { selectedConversation } = useConversation();

//    const fromMe = message?.sender?._id === authUser?._id;

//    const formatedTime = extractTime(message.createdAt);

//    // Its means if message is send by me then it will be in starting otherwise its in ending.
//    const chatClassName = fromMe ? 'chat-start' : 'chat-end';

//    //By writing ? we done optional chaining.
//    //Show profile picture according to who have send that message.
//    const profilePic = fromMe
//        ? authUser.profilePic || selectedConversation?.profilePic : "default-avatar.png";

//    //Add background-colour of text.    
//    const bubbleBgColor = fromMe ? 'bg-blue-500' : '';

//    // Safely extract the message content (ensure it's a string)
//    const messageContent = typeof message?.message === 'string'
//        ? message.message
//        : JSON.stringify(message?.message.message) || "No message content";


//    //if its true then we will add shake class.For movement of message we use shake class .    
//    const shakeClass = message.shouldShake ? "shake" : ""



//    //We use '$' for dynamic value If we are taking.    
//    return (
//      <div className={`chat ${chatClassName}`}>
//         <div className="chat-image avatar">
//            <div className="w-10 rounded-full">
//               <img
//                  alt="User Avatar"
//                  src={profilePic || "/default-avatar.png"}
//               />
//            </div>
//         </div>

//         <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
//            {messageContent}
//         </div>

//         <time className="text-xs opacity-50">{formatedTime}</time>
//      </div>
//    );
// };

// export default Message;




// import React from 'react';
// import {useAuthContext} from '../../context/AuthContext.jsx';
// import useConversation from '../../zustand/useConversation.js';


// const Message = ({message}) => {
//    const {authUser} = useAuthContext();
//    const {selectedConversation} =useConversation();
//    const fromMe = message?.sender?._id === authUser?._id;
//    console.log(message);

//    // Its means if message is send by me then it will be in starting otherwise its in ending.
//     const chatClassName = fromMe ? 'chat-end':'chat-start';

//     //By writing ? we done optional chaining.
//     //Show profile picture according to who have send that message.
//     const profilePic = fromMe
//         ? authUser.profilePic || "default-avatar.png" : selectedConversation?.profilePic;

//     //Add background-colour of text.
//     const bubbleBgColor = fromMe ? 'bg-blue-500' : "";


//     //We use '$' for dynamic value If we are taking.
//   return (
//     <div className={`chat ${chatClassName}`}>
//         <div className='chat-image avatar'>
//             <div className='w-10 rounded-full'>
//                 <img
//                     alt='Tailwind CSS chat bubble component'
//                     src={profilePic || "/default-avatar.png"}
//                 />
//             </div>
//         </div>

//         {console.log(message)}
//          {/* we can't use single-upper-comma or double-upper-comma so thatswhy we have used  this `` one. */}
//         <div className={`chat-bubble text-white bg-blue-500 ${bubbleBgColor }}`}>
//               {message?.message?.message ? message.message: "No message content"}     
//         </div>
//         <time className="text-xs opacity-50">12:45</time>
       
//     </div>
//   );
// };

// export default Message;
