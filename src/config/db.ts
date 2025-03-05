import mongoose from 'mongoose'
import { exit } from 'node:process';
import dotenv from 'dotenv'

 dotenv .config({path:'.env.local'})
 /**
  * Setting to connect with mongoose databse 
  */
export const connectDB =async()=>{
 const urlDatabase =process.env.URL_DATABESE_TOKEN
    try {
        const {connection} = await mongoose.connect(`${urlDatabase}`)
        console.log(`DATABASE SUCCESSFULLY CONNECT TO ${connection.host} AND PORT ${connection.port}`)
    } catch (error) {
        console.log("THERE WAS AN ERROR WHILE DATABASE WAS TRYING TO CONNECT",error)
        exit(1)
    }
}
export default connectDB