// import { useEffect } from 'react';
// import { useSocketContext } from '../context/SocketContext'
// import useConversation from '../zustand/useConversation';

// import notificationSound from "../assets/sounds/notification.mp3";

// const useListenMessages = () => {
//     // This useSocketContext returns "socket" 
//     const { socket } = useSocketContext();
//     const { messages, setMessages } = useConversation();

//     useEffect(() => {
//         socket?.on("newMessage", (newMessage) => {
//             newMessage.shouldShake = true;

//             // Add the sound of notification when a message comes.
//             const sound = new Audio(notificationSound);
//             sound.play();

//             // Update messages array correctly by using the previous state
//             setMessages((prevMessages) => [...prevMessages, newMessage]);
//         });

//         // Ensure socket is cleaned up after component unmounts
//         return () => socket.off("newMessage");

//     }, [socket, setMessages]);
// };

// export default useListenMessages;

import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;

      const sound = new Audio(notificationSound);
      sound.play();

      // Only add the message content
      setMessages((prevMessages) => [...prevMessages, newMessage.message]); // Only store message content
    });

    return () => socket.off("newMessage");
  }, [socket, setMessages]);
};

export default useListenMessages;
