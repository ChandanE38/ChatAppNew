// //This is the code responsible for showing the message of any people.

// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../zustand/useConversation";

// const Message = ({ message }) => {
// 	const { authUser } = useAuthContext();
// 	const { selectedConversation } = useConversation();
// 	const fromMe = message.senderId === authUser._id;
// 	const formattedTime = extractTime(message.createdAt);
// 	const chatClassName = fromMe ? "chat-end" : "chat-start";
// 	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
// 	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

// 	const shakeClass = message.shouldShake ? "shake" : "";

// 	return (
// 		<div className={`chat ${chatClassName}`}>
// 			<div className='chat-image avatar'>
// 				<div className='w-10 rounded-full'>
// 					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
// 				</div>
// 			</div>
// 			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
// 			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
// 		</div>
// 	);
// };
// export default Message;


// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../zustand/useConversation";

// const Message = ({ message }) => {
// 	const { authUser } = useAuthContext();
// 	const { selectedConversation } = useConversation();
// 	const fromMe = message.senderId === authUser._id;
// 	const formattedTime = extractTime(message.createdAt);
// 	const chatClassName = fromMe ? "chat-end" : "chat-start";
// 	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
// 	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

// 	const shakeClass = message.shouldShake ? "shake" : "";

// 	// Ensure message.message is a string (use `JSON.stringify` if it's an object)
// 	const messageContent = typeof message.message === "object" 
// 		? JSON.stringify(message.message) 
// 		: message.message;

// 	return (
// 		<div className={`chat ${chatClassName}`}>
// 			<div className="chat-image avatar">
// 				<div className="w-10 rounded-full">
// 					<img alt="User profile" src={profilePic} />
// 				</div>
// 			</div>
// 			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
// 				{messageContent} {/* Render the safe message content */}
// 			</div>
// 			<div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
// 				{formattedTime}
// 			</div>
// 		</div>
// 	);
// };

// export default Message;


// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../zustand/useConversation";

// const Message = ({ message }) => {
//   const { authUser } = useAuthContext();
//   const { selectedConversation } = useConversation();
  
//   // Ensure message.message is a string
//   const messageContent = typeof message.message === "object" 
//     ? JSON.stringify(message.message) // If message is an object, stringify it
//     : message.message; // Otherwise, use the string directly

//   // Check if the message is sent by the current user
//   const fromMe = message.senderId === authUser._id;
  
//   // Format the time of the message
//   const formattedTime = extractTime(message.createdAt);
  
//   // Determine the class for chat bubble (chat-end for messages from the user, chat-start for others)
//   const chatClassName = fromMe ? "chat-end" : "chat-start";
  
//   // Get the profile picture (either from the user or the selected conversation)
//   const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  
//   // Background color for the chat bubble (blue for user messages)
//   const bubbleBgColor = fromMe ? "bg-blue-500" : "";

//   // Add shaking animation if specified
//   const shakeClass = message.shouldShake ? "shake" : "";

//   return (
//     <div className={`chat ${chatClassName}`}>
//       <div className="chat-image avatar">
//         <div className="w-10 rounded-full">
//           <img alt="User profile" src={profilePic} />
//         </div>
//       </div>
      
//       {/* Render the message content */}
//       <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
//         {messageContent} {/* Render message content */}
//       </div>
      
//       <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
//         {formattedTime}
//       </div>
//     </div>
//   );
// };

// export default Message;


import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  // Debugging the message object
  console.log("Received message:", message); // Log the whole message object
  console.log("Message content:", message.message); // Log only the message part

  // Ensure message.message is a string
  const messageContent = typeof message.message === "object" 
    ? JSON.stringify(message.message) // If message is an object, stringify it
    : message.message; // Otherwise, use the string directly

  // Check if the message is sent by the current user
  const fromMe = message.senderId === authUser._id;

  // Format the time of the message
  const formattedTime = extractTime(message.createdAt);

  // Determine the class for chat bubble (chat-end for messages from the user, chat-start for others)
  const chatClassName = fromMe ? "chat-end" : "chat-start";

  // Get the profile picture (either from the user or the selected conversation)
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;

  // Background color for the chat bubble (blue for user messages)
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  // Add shaking animation if specified
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="User profile" src={profilePic} />
        </div>
      </div>

      {/* Render the message content */}
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
        {messageContent} {/* Render message content */}
      </div>

      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
