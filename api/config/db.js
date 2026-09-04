import mongoose from "mongoose"

let isConnected = false
const dbConnect = async () => {
    if(isConnected){
        console.log("Already connected to database.")
        return
    }
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`connected to database ${connection.connection.host}`)
    } catch (error) {
        console.log(`error while connecting to database :${error}`)
        process.exit(1)
    }

}
export default dbConnect;