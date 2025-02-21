import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateAccessToken from "../lib/accessToken.js"
export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be atleast 6 charcters long" })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exsit" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        })
        console.log(`${newUser}`);

        if (newUser) {
            await newUser.save();
            generateAccessToken(newUser._id, res)
            res.status(201).json({
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                avatar: newUser.avatar,
            })
        } else {
            return res.status(400).json({ message: "Invaild User data" })
        }

    } catch (error) {
        console.log("Error in signUp.controller");
        return res.status(500).json({ message: "Internal Server Error" })
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Invaild Credentials" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Invaild Credentials" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invaild Credentials" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invaild Credentials" })
        }

        generateAccessToken(user._id, res)
        res.status(201).json(
            {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                avatar: user.avatar
            }
        )

    } catch (error) {
        console.log("Error in login.controller");
        return res.status(500).json({ message: "Internal Server Error" })
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("accessToken", "", {
            maxAge: 0, //Mile SECOND
            httpOnly: true, // prevent XSS attacts cross-site scripting attacts
            sameSite: "strict", //CSRF attacts cross-site request forgery attacks
            secure: process.env.NODE_ENV !== "development"
        })
        return res.status(200).json({ message: "LogOut successfully" })
    } catch (error) {
        console.log("Error in logout.controller");
        return res.status(500).json({ message: "Internal Server Error" })
    }
};

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.error(`Error in Check auth Controller Err: ${error}`);
        return res.status(500).json({message : 'Internal Server Error'})
    }
};