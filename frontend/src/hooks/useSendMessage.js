// import useConversation
import { useState } from "react";
// import useConversation from "../../../zustand/useConversation.js";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSendmessage = () => {
  const [loading,setLoading] = useState(false);
  const {messages,setMessages , selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);

    try{
        const token = localStorage.getItem("token"); // Retrieve token from storage

        const res = await fetch(`http://localhost:5000/api/message/send/${selectedConversation._id}`,{
            // You should always use post method for send message.
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "Authorization": `Bearer ${token}`, // ✅ Attach token here
            },
            body: JSON.stringify({ message }), //here you have to use comma i.e ,

    });

    const data = await res.json();
    if(data.error) throw new Error(data.error || "Failed to send message");

    setMessages([...messages,data]);
    }catch(error){
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
  }
  return {sendMessage,loading}
}

export default useSendmessage