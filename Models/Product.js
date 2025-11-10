import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    description:{type:String},
    price:{type:Number,required:true},
    originalPrice:{type:Number,required:true},
    images:{type:String},
    category:{type:mongoose.Types.ObjectId,ref:"Category",required:true},
    Brand:{type:mongoose.Types.ObjectId,ref:"Brand",required:true},
    stock:{type:Number,required:true,default:0},

    isActive:{type:Boolean,default:true},
    attributes:[{
        size:{type:String},
        color:{type:String}
    }]
},
{timestamps:true}
)

export const Brand=mongoose.model("Brand",brandSchema)