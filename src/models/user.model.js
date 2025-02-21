import mongoose from "mongoose";

//Schema
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,  
            unique: true,
        },
        fullName: {
            type: String,
            required: true, 
        },
        password: {
            type: String,
            required: [true, "Password must be required"],
            minlength: 6,
        },
    },
    {
        timestamps: true,
    }
);

//Model
const User = mongoose.model("User", userSchema);

export default User;