import {connect} from "mongoose"
import "dotenv/config"
import mongoose from "mongoose"

const dbConnect=async ()=>{
    const DB_URL=`${process.env.DB_URL_2}`
    mongoose.set('strictQuery', false);
    await connect(DB_URL)
    console.log('Conexion lista!')
}

export default dbConnect