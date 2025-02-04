
import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation';

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    //This useSocketContext return "socket" 
    const{socket} = useSocketContext();

    const {messages,setMessages}= useConversation();

    useEffect(()=>{
      socket?.on("newMessage",(newMessage) => {
         newMessage.shouldShake = true;

         //Add the sound of notification when message came.
         const sound = new Audio(notificationSound);
         sound.play();

         setMessages([...messages,newMessage])
      });

      //this line is also important bcz you should not listen sound more than once if one message came.
      return ()=>socket.off("newMessage")
      
    },[socket,setMessages,messages])
}

export default useListenMessages