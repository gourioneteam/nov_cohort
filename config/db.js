const mongoose=require("mongoose")
require('dotenv').config()

const connnectDb=async ()=>{
    try{
       const conn= await mongoose.connect(process.env.MongoDbURI)
        console.log("Connection established successfully")
        console.log(`Connected to DB: ${conn.connection.name}`); // ✅ correct way
                console.log(`Host: ${conn.connection.host}`);            // Optional: Shows DB host


    }
    catch(err){
        console.log("MongoDb Connection Error",err.message)
    }
}

module.exports=connnectDb