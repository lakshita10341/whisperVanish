import mongoose from "mongoose";
import Users from './userModel.js'
// console.log(Users)   ;
const msgSchema = mongoose.Schema({
    message :{
        text:{
            type: String,
            required: true,
        },
    },
        users : Array,
        sender:{
            type: mongoose.Schema.Types.ObjectId,
            ref: Users,
            required: true,
        } ,
    },
   
    {
        timestamps: true,

    }
);

export default mongoose.model("messages",msgSchema);