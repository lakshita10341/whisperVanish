import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    Username :{
        type: String,
        required: true,
        min :3,
        max:20,
        unique : true,

    },
    email:{
        type : String,
        required: true,
        max:50,
        unique : true,
    },
    password:{
        type : String,
        required: true,
        min :8,
        max:20,
        unique : true,
    },
    isAvatarImageSet: {
        type: Boolean,
        default : false,
    },
    avatarImage :{
        type :String,
        default :" ",
    },
});

export default mongoose.model("Users", userSchema);
