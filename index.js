const express=require('express')
const app=express()
require('dotenv').config()


const connectDB=require("./config/db")

connectDB()
console.log("welcome")

app.use(express.json())

app.get("/",(req,res)=>{
res.send("Welcome")
})

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Listening to  http://localhost:${PORT}`)
})