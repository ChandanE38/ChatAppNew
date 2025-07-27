import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading , setLoading]= useState(false);
  const {messages,setMessages,selectedConversation}=useConversation();

  useEffect(()=>{
    const getMessages = async () => {
        setLoading(true);

        try{
            const token = localStorage.getItem("token"); // Get token (modify based on your auth system)
            if (!token) throw new Error("No authentication token found");

            //this is get method then we dont need to add any options of method.
            const res = await fetch(`http://localhost:5000/api/message/${selectedConversation._id}`,{
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Attach token
                  },
                }
            );
            

            const data = await res.json(); // Parse response
            console.log("this is the conversation messages:",data);

            // If there is any error then throw that error.
            if(data.error) throw new Error(data.error);

            //Otherwise
            setMessages(data);
                    // Store only the message content
            // setMessages(data.map(msg => msg.message)); // Only store message content
        }catch(error){
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    //Call this getMessages function.If there is a any selected conversation.
    if(selectedConversation?._id) getMessages();

  },[selectedConversation._id,setMessages]) //@@@@@ what is the use of this?

  return {messages,loading};
}

export default useGetMessages;
