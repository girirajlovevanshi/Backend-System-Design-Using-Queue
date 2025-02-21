import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';
export const protectAuth = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    try {

        if (!accessToken) {
            return res.status(401).json({ message: "Unauthorized : No Access Token" })
        }

        const decoded = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET)
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized : No Vaild Access Token" })
        }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(401).json({ message: "Unauthorized : No User found" })
        }

        req.user = user;

        next()
    } catch (error) {
        console.log("Error in ProcetRoute middleware error: ", error);

    }

}