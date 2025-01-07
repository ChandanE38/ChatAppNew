import React from 'react'
import Messages from './Messages.jsx'
import MessageInput from './MessageInput.jsx'

const MessageContainer = () => {
  const noChatSelected= false;
  return (
    <div className='md:min-w-[450px] flex flex-col w-1800px'>
        {noChatSelected ? ( <NoChatSelected/> 
        ) : (
             <> 
             <div>  
                 <span className='label-text'></span>
                 <span className='text-gray-900 font-bold'>Rohan</span>
             </div>
     
             <Messages />
             <MessageInput />
         </>
        
        )}
    </div>
  )
}

export default MessageContainer;


import { TiMessages } from "react-icons/ti";

const NoChatSelected = ({ username = "User" }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        {/* <p>Welcome {username}</p> */}
       
        <p>Welcome {username}</p>
        <p>Select a chat to start messaging</p>
        {
          // Icon made by the help of TiMessages
        }
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

