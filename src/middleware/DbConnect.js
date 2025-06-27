import mongoose from "mongoose"

const connectDb = async (handler,req,res) => {
    try{
        if(mongoose.connections[0].readyState) {
            return handler(req, res)
        }
        await mongoose.connect(process.env.MONGO_URI)
        return handler(req, res)
    }catch(err) {
        console.error("unable to connect to Mongodb due to some failure...",err)
    }
}

export default connectDb