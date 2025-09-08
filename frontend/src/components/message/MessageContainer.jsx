import React, { useEffect } from 'react';
import Messages from './Messages.jsx';
import MessageInput from './MessageInput.jsx';
import { TiMessages } from 'react-icons/ti';
import useConversation from '../../zustand/useConversation.js';
import { useAuthContext } from '../../context/AuthContext.jsx';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
 

  useEffect(() => {
    console.log("🟢 Selected Conversation Object:", selectedConversation);
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

