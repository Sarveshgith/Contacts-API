const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : [true, "Enter your email"],
        unique : [true, "Email already taken"]
    },

    password : {
        type : String,
        required : [true, "Enter your password"]
    }
},
{
    timestamps : true,
});

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;