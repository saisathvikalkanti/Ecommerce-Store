import { User } from "../models/user.model.js";

export const fetchUserProfile = async (req, res)  => {
    try {
        return res.status(200).json({
            success: true,
            message: "Feched user profile successfully",
            user: req.user
        })
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({
            success: false,
            message: "Fetching Error"
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({
                success: false, 
                message: "User not found",
            })
        }
        if(name && user.name !== name){
            user.name = name;
        }
        if(email && user.email !== email){
            user.email = email;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User profile updated successfully"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Profile Update Error"
        })
    }
}