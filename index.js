const express=require('express')
const app=express()
require('dotenv').config()
const apiroutes=require('./Routes/routeindex')

const connectDB=require("./config/db")

connectDB()
console.log("welcome")

app.use(express.json())

app.get("/",(req,res)=>{
res.send("Welcome")
})
app.use("/api",apiroutes)
const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Listening to  http://localhost:${PORT}`)
})