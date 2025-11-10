import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilepic:{type:String,required:true,default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s"},
    Mobile:{type:String,required:true},
    isActive:{type:Boolean,default:true},
    role:{type:String,enum:["admin","Customer","brand"]},
    address:[
        {
            street:{type:String},
            city:{type:String},
            state:{type:String},
            ZipCode:{type:String},
            Country:{type:String}
        }
    ]
},
{timestamps:true}
)

export const Brand=mongoose.model("User",userSchema)