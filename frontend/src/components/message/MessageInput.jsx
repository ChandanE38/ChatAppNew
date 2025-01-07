import { BsSend } from "react-icons/bs";
import NoChatSelected from "./NoChatSelected"; // Ensure this component is imported
import React, { useState } from "react";

const MessageInput = () => {
  const [noChatSelected, setNoChatSelected] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() === "") return; // Prevent sending empty messages
    console.log("Message sent:", message);
    setMessage(""); // Clear the input after sending
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      {noChatSelected ? (
        <NoChatSelected />
      ) : (
        <div className="w-full relative">
          <input
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 text-white"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            aria-label="Send message"
          >
            <BsSend />
          </button>
        </div>
      )}
    </form>
  );
};

export default MessageInput;





// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("Message sent!");
//   };

//   const noChatSelected=true;

//   return (
//     <form className="px-4 my-3" onSubmit={handleSubmit}>
//       {noChatSelected ? (
//          <NoChatSelected/> 
//       ) : (
//         <div className="w-full relative">
//             <input
//             type="text"
//             className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 text-white"
//             placeholder="Send a message"
//             />
//             <button
//             type="submit"
//             className="absolute inset-y-0 right-0 flex items-center pr-3"
//             aria-label="Send message"
//             >
//             <BsSend />
//             </button>
//         </div>

//       )}
//     </form>
//   );
// };

// export default MessageInput;









// // import React from 'react'
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
//   return (
//     <form className='px-4 my-3'>
//         <div className='w-full relative'>
//             <input 
//                type="text" 
//                className='border text-sm rounded-lg block w-full p-2.5
//                bg-gray-600 text-white'
//                placeholder='Send a message'
//             />
//             <button type='submit' className='absolute insert-y-0 end-0 flex items-center pe-3'>
//                 <BsSend />
//             </button>    
//         </div>
//     </form>
//   )
// }

// export default MessageInput