// import React, { useEffect } from 'react'
// import Messages from './Messages.jsx'
// import MessageInput from './MessageInput.jsx'
// import {TiMessages} from "react-icons/ti"
// import useConversation from '../../zustand/useConversation.js'
// import { useAuthContext } from '../../context/AuthContext.jsx'


// const MessageContainer = () => {
//   const {selectedConversation , setSelectedConversation} = useConversation();
//   // const noChatSelected= false;

//   //This use effect is used for that not getting open of user message which we have ---
//   // selected previously and after login that should not shown;
//   useEffect(()=>{
//     // Clean-up function and then after login again there is null selected conversation
//     return () => setSelectedConversation(null);
//   },[setSelectedConversation]);

//   return (
//     <div className='md:min-w-[450px] flex flex-col w-1800px'>
//         {!selectedConversation ? ( 
//           <NoChatSelected/> 
//         ) : (
//              <> 
//              <div>  
//                  <span className='label-text'></span>
//                  <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
//              </div>
//              <Messages />
//              <MessageInput />
//          </>
//         )}
//     </div>
//   )
// }

// export default MessageContainer;



// const NoChatSelected = () => {
//   const {authUser} = useAuthContext();
//   return (
//     <div className="flex items-center justify-center w-full h-full">
//       <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
//         {/* <p>Welcome {username}</p> */}
       
//         <p>Welcome 👋 {authUser.fullName} 🌠</p>
//         <p>Select a chat to start messaging</p>
//         {
//           // Icon made by the help of TiMessages
//         }
//         <TiMessages className="text-3xl md:text-6xl text-center" />
//       </div>
//     </div>
//   );
// };

import React, { useEffect } from 'react';
import Messages from './Messages.jsx';
import MessageInput from './MessageInput.jsx';
import { TiMessages } from 'react-icons/ti';
import useConversation from '../../zustand/useConversation.js';
import { useAuthContext } from '../../context/AuthContext.jsx';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col w-full">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header with profile photo and name */}
          <div className="flex items-center gap-3 p-4 border-b bg-white shadow-sm">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={selectedConversation?.profilePic || '/default-avatar.png'}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-gray-900 font-bold text-lg">
              {selectedConversation.fullName}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

// NoChatSelected Component
const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-500 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} 🌠</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
