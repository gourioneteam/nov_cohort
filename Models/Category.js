import mongoose from "mongoose";
const categorySchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    
    image:{type:String},
    description:{type:String},
    isActive:{type:Boolean,default:true}
},
{timestamps:true}
)

export const Brand=mongoose.model("Category",categorySchema)