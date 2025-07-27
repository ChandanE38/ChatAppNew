import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res,) => {
  try {
    const { message } = req.body;
    const { id:receiverId } = req.params;
    const senderId = req.user._id;

    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: User not logged in" });
    }

    // Find existing conversation or create a new one
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        // message: [],
      });
    }

    // Create and save the new message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    // Push message ID to conversation
    if(newMessage){
      conversation.message.push(newMessage._id);
    }
    
    //save conversation in the data base
    // await conversation.save();
    // await newMessage.save();

    //Instead of doing one by one we do it like this bcz this saving message and conversation run parallel so this will save time;
    await Promise.all([conversation.save(),newMessage.save()]);

    //SOCKET IO Functionality will be added here;
    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log("Receiver socket ID:", receiverSocketId);
    if(receiverSocketId){
      //io.to(<socket._id>).emit() used to send events to specific client.
      console.log("Emitting newMessage to socket:", receiverSocketId);
      io.to(receiverSocketId).emit("newMessage",newMessage);
    } else {
      console.log("No receiver socket found for user:", receiverId);
    }

    // Respond with success
    console.log("Sending response:", {message: newMessage});
    res.status(201).json({message:newMessage});

  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const getMessage = async (req,res)=>{
  try{

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: User not logged in" });
    }

    const {id:userToChatId} = req.params;
    console.log("We will get message here");
    const senderId = req.user._id;

    //By using the .populate() we added message into the conversation
    const conversation = await Conversation.findOne({
      participants:{$all:[senderId,userToChatId]},
    }).populate("message");

    if(!conversation) return res.status(200).json([]);

    const message=conversation.message;

    //console.log(conversation.message);

    res.status(200).json(message);

  } catch (error) {
    console.log("Error in getMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
