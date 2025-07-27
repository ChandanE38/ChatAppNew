// controllers/user.controller.js
import User from "../models/user.model.js";

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, about } = req.body;

        // Prepare update object
        const updateData = {
            name,
            about
        };

        // If a file was uploaded, include the path
        if (req.file) {
            updateData.avatar = `/uploads/profile_pics/${req.file.filename}`;
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

