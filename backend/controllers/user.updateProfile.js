// controllers/user.controller.js
import User from "../models/user.model.js";

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { fullName, username, gender } = req.body;

        // Validate required fields
        if (!fullName || !username || !gender) {
            return res.status(400).json({ error: "Full name, username, and gender are required" });
        }

        if (gender !== "male" && gender !== "female") {
            return res.status(400).json({ error: "Gender must be either 'male' or 'female'" });
        }

        const existingUser = await User.findOne({ username, _id: { $ne: userId } });
        if (existingUser) {
            return res.status(400).json({ error: "Username is already taken" });
        }

        // Prepare update object
        const updateData = {
            fullName,
            username,
            gender
        };

        // If a file was uploaded, include the path
        if (req.file) {
            updateData.profilePic = `/uploads/profile_pics/${req.file.filename}`;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in updateProfile:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
