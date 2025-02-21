import jwt from "jsonwebtoken"

const generateAccessToken = (userId, res) => {
    
    const accessToken = jwt.sign(        
        { userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },        
    )
    
    res.cookie("accessToken", accessToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //Mile SECOND
        httpOnly: true, // prevent XSS attacts cross-site scripting attacts
        sameSite: "strict", //CSRF attacts cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })    
    return accessToken;
};

export default  generateAccessToken