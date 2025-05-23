import User from "../models/user.model.js";

// Hook() to fetch the conversation from the database.
export const getUsersForSidebar = async (req,res) => {
    try{

        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);

    }catch{
        res.status(500).json({error:"Internal controller function error"});
        console.error("Error in the getUserForSidebar function",error.message);
        // res.status(500).json({error:"Internal controller function error"});
    }

}

