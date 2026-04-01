import { User } from "../models/user.model.js";
import { createAccessTokenAndSetToCookies } from "../utils/accessToken.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const cleanedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({email: cleanedEmail});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists with this email please try with another email",
            });
        }
        const newUser = await User.create({
            name: name.trim(),
            email: cleanedEmail,
            password,
            role: role || "user"
        })

        const responseUser = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        }

        createAccessTokenAndSetToCookies(newUser._id, newUser.role, res);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: responseUser
        })

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: "Registration Error",
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const cleanedEmail = email.trim().toLowerCase();
        const user = await User.findOne({ email: cleanedEmail }).select("+password");
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if(!isPasswordCorrect){
           return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            }); 
        }

        createAccessTokenAndSetToCookies(user._id, user.role, res);
        const responseUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
        return res.status(200).json({
            success: true,
            message: "User login successfull",
            user: responseUser

        })

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: "Login Error",
        })
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: "Log out Error"
        })
    }
}