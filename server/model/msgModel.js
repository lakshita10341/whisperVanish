const mongoose =require("mongoose");
const Users = require("./userModel");
// console.log(Users);
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

module.exports = mongoose.model("messages",msgSchema);