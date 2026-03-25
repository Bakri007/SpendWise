import mongoose from "mongoose";
import { isName } from "../utils/validate";

const CategorySchema = mongoose.Schema({
_id:{
    type:mongoose.Schema.Types.ObjectId,
    default:()=>new mongoose.Types.ObjectId()
},
user_id:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},
name:{
type: String,
required:[true,"Name is required"],
 maxlength: [50, 'Category name cannot exceed 50 characters']
},
icon:{
    type:string,
    default: '📦',
    trim: true
},
color:{
    type:string,
    enum:['red','blue','green','yellow','black','white']
},




})