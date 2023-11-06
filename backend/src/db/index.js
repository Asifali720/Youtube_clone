import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectionDataBase = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log('MONGODB is not connected', error);
        process.exit(1)
    }
}

export default connectionDataBase