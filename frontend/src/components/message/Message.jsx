import PropTypes from "prop-types";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;

  console.log(message.senderId, authUser._id, fromMe);
  
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";

  const defaultPic = "/default-avatar.png"; // Update with your actual fallback image path
  
  const profilePic = fromMe
    ? authUser.profilePic || defaultPic
    : selectedConversation?.profilePic || defaultPic;

  // Safely extract message content
  const messageContent =
    typeof message.message === "object" && message.message !== null
      ? JSON.stringify(message.message.message || message.message)
      : message.message;

  const bubbleBgColor = fromMe
    ? "bg-blue-500 text-white"
    : "bg-gray-300 text-black";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} pb-2`}>
        {messageContent}
      </div>

      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

// Prop types for safety
Message.propTypes = {
  message: PropTypes.shape({
    senderId: PropTypes.string.isRequired,
    message: PropTypes.any.isRequired,
    createdAt: PropTypes.string.isRequired,
    shouldShake: PropTypes.bool,
  }).isRequired,
};

export default Message;


