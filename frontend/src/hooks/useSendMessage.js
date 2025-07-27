// import useConversation
import { useState } from "react";
// import useConversation from "../../../zustand/useConversation.js";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";

const useSendmessage = () => {
  const [loading,setLoading] = useState(false);
  const {messages,setMessages , selectedConversation } = useConversation();

  //New code
  const { authUser } = useAuthContext();

  const sendMessage = async (message) => {
    setLoading(true);
    console.log("🚀 Starting to send message:", message);
    console.log("📤 Sending to conversation:", selectedConversation._id);

    try{
        const token = localStorage.getItem("token"); // Retrieve token from storage
        console.log("🔑 Token available:", !!token);

        const res = await fetch(`http://localhost:5000/api/message/send/${selectedConversation._id}`,{
            // You should always use post method for send message.
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "Authorization": `Bearer ${token}`, // ✅ Attach token here
            },
            body: JSON.stringify({ message }), //here you have to use comma i.e ,

        });

        console.log("📡 Response status:", res.status);
        const data = await res.json();
        console.log("📥 Full response data:", data);
        
        if(data.error) throw new Error(data.error || "Failed to send message");

        console.log("Send message response:", data);

        // Extract the message from the response structure
        const newMessage = data.message;
        console.log("Adding new message to state:", newMessage);

        setMessages([...messages, newMessage]);
        console.log("✅ Message added to state successfully");
    }catch(error){
        console.error("❌ Error sending message:", error);
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
  }
  return {sendMessage,loading}
}

export default useSendmessage