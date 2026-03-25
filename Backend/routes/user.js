import mongoose from "mongoose";
import { isName,isEmail,isStrongPassword } from "../utils/validate";
import userRoles from "../utils/userRoles";

const userSchema = mongoose.Schema({
    name:{
        Type:String,
        required:[true, "Name is required"],
        validate:[isName,"Invalid Name"],
    },
    email:{
        Type:String,
        required:[true,"Email is required"],
        validate:[isEmail,"Invalid Email"]
    },
    password:{
        Type:String,
        required:[true, "Password is required"],
        validate:[isStrongPassword,"Set strong password"]
    },
    verificationCode:{
        tyoe:String
    },
    role:{
        type:String,
        enum:[userRoles.ADMIN,userRoles.USER],
        default:userRoles.USER,
    },
    token:{
        type:String,
    }
});

let userModel =mongoose.model("User",userSchema);

export default userModel;