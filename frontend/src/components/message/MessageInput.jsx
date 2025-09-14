import { BsSend } from "react-icons/bs";
import React, { useState } from "react";
import useSendmessage from "../../hooks/useSendMessage";


const MessageInput = () => {
  const [message,setMessage]= useState("");

  //now we can use sendMessage as a function.
  const {loading , sendMessage} = useSendmessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here if message is not present then return means--- 
    // not run this function mreans if there is not any message typed then dont run this function;
    if(!message) return;

    // if there is message then run this sendMessage function
    await sendMessage(message);

    //And after upper step completed this set message state value is empty
    setMessage("");
  }

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit} >
        <div className="w-full relative">
            <input
              type="text"
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 text-white"
              placeholder="Send a message"
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              aria-label="Send message"
            >
              {/* if this loading value is true then show loding-spinner otherwise show <BsSend/> */}
               {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
            </button>
        </div>
    </form>
  );
};

export default MessageInput;

