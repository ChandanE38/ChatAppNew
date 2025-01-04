// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";

// export const sendMessage = async (req,res) => {
//   try{
//     const {message}=req.body;
//     const {id:reciverId } = req.params;
//     // const {id} = req.params.id;
//     const senderId= req.user._id;

//      let conversation = await Conversation.findOne({
//         participant:{$all: [senderId,receiverId] },
//     });

//     if(!conversation){
//         conversation = await Conversation.create({
//             participant:[senderId , receiverId],
        
//         });
//     }

//     const newMessage = new Message({
//         senderId,
//         receiverId,
//         message,
//     });

//     if(newMessage){
//         conversation.message.push(newMessage._id);
//     }

//     res.status(201).json({message:"Message sent successfully"});

//   }catch{
//     console.log("Error in send message controller:",error.message);
//     res.status(500).json({error:"Internal server error"});

//   }
// };
                                           

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res,) => {
  try {
    const { message } = req.body;
    const { id:receiverId } = req.params;
    const senderId = req.user._id;

    console.log(receiverId  , "Chandu");

    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: User not logged in" });
    }


    // Find existing conversation or create a new one
    let conversation = await Conversation.findOne({
      participant: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participant: [senderId, receiverId],
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
    conversation.message.push(newMessage._id);
    await conversation.save();

    // Respond with success
    res.status(201).json({ message:newMessage});
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
