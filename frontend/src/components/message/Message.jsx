import React from 'react';
import { useAuthContext } from '../../context/AuthContext.jsx';
import useConversation from '../../zustand/useConversation.js';
import { extractTime } from '../../utils/extractTime.js';

const Message = ({ message }) => {
   const { authUser } = useAuthContext();
   const { selectedConversation } = useConversation();

   const fromMe = message?.sender?._id === authUser?._id;

   const formatedTime = extractTime(message.createdAt);

   // Its means if message is send by me then it will be in starting otherwise its in ending.
   const chatClassName = fromMe ? 'chat-end' : 'chat-start';

   //By writing ? we done optional chaining.
   //Show profile picture according to who have send that message.
   const profilePic = fromMe
       ? authUser.profilePic || "default-avatar.png": selectedConversation?.profilePic;

   //Add background-colour of text.    
   const bubbleBgColor = fromMe ? 'bg-blue-500' : '';

   // Safely extract the message content (ensure it's a string)
   const messageContent = typeof message?.message === 'string'
       ? message.message
       : JSON.stringify(message?.message.message) || "No message content";


   //if its true then we will add shake class.For movement of message we use shake class .    
   const shakeClass = message.shouldShake ? "shake" : ""



   //We use '$' for dynamic value If we are taking.    
   return (
     <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
           <div className="w-10 rounded-full">
              <img
                 alt="User Avatar"
                 src={profilePic || "/default-avatar.png"}
              />
           </div>
        </div>

        <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
           {messageContent}
        </div>

        <time className="text-xs opacity-50">{formatedTime}</time>
     </div>
   );
};

export default Message;




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
