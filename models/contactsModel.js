const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },

    name : {
        type: String,
        required: true
    },

    email : {
        type:String,
        required: [true, "Enter your email"]
    },

    phone : {
        type : Number,
        required : [true, "Its Contact Page goddamnit"]
    },
},
{
    timestamps : true,
});

const Contacts = mongoose.model('Contact',contactSchema);
module.exports= Contacts; 