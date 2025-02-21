import  mongoose from 'mongoose'

export const connectDB =async ()=>{
    try {
        const connectionInstance =await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MONGODB connected successfully, Host : ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.error(`error : ${error}`);
        process.exit(1)
        
    }
}
