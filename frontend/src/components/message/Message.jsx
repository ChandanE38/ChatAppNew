import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  console.log("Received message:", message);
  console.log("Message content:", message.message);

  
  // // ✅ Safe and consistent extraction of message content
  // const getMessageText = (msg) => {
  //   if (typeof msg === "string") return msg;
  //   if (typeof msg === "object" && typeof msg.message === "string") return msg.message;
  //   return JSON.stringify(msg); // fallback for debugging or malformed structure
  // };

  // const messageContent = getMessageText(message.message);

  const messageContent =
    typeof message.message === "object"
      ? JSON.stringify(message.message.message)
      : message.message;

  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500 text-white" : "bg-gray-300 text-black";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="User profile" src={profilePic} />
        </div>
      </div>

      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} pb-2`}>
        {messageContent}
      </div>

      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;

