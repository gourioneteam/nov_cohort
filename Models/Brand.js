import mongoose from "mongoose";
const brandSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    logo:{type:String},
    description:{type:String},
    isActive:{type:Boolean,default:true}
},
{timestamps:true}
)

export const Brand=mongoose.model("Brand",brandSchema)