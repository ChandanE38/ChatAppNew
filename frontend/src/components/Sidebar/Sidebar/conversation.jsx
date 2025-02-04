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



import React from "react";
import useConversation from "../../../zustand/useConversation.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation && selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id); // ✅ Fixed typo

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer 
          ${isSelected ? "bg-sky-500" : ""}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        {/* User Avatar */}
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full">
             <img 
                src={conversation.profilePic} 
                alt="user avatar" 
             />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 flex justify-between items-center">
          <p className="font-bold text-gray-200">{conversation.fullName}</p>
          <span className="text-xl">{emoji}</span>
        </div>
      </div>

      {/* Divider for Separation */}
      {!lastIdx && <div className="divider my-0 py-0 h-px bg-gray-600" />}
    </>
  );
};

export default Conversation;
