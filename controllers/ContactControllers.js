//as we need to use mongodb we need to make all the process async
const asyncHandler = require("express-async-handler"); //used for try and catch eroor handle for async commands
const Contact = require("../models/contactsModel");

const getCont = asyncHandler(async(req, res) => {
    const contact = await Contact.find({user_id : req.user.id});
    res.status(200).json(contact);
});

const createCont = asyncHandler(async(req, res) => {
    console.log("Created Contact : ", req.body);
    const {name, phone, email} = req.body;
    if( !name || !phone || !email ){ 
        res.status(400);
        throw new  Error("Missing fields");}

    const contact = await  Contact.create({ name, email, phone, user_id : req.user.id });
    res.status(200).json(contact);
})

const getContone = asyncHandler(async(req, res) => {
    const  contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }

    if(contact.user_id.toString() !== req.user.id)
        {
            res.status(403);
            throw new Error("Updation by unspecified user");
        }
    res.status(200).json(contact);
})

const updateCont = asyncHandler(async(req, res) => {
    const contact = await  Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(contact.user_id.toString() !== req.user.id)
        {
            res.status(403);
            throw new Error("Updation by unspecified user");
        }

    const updateCont = await Contact.findByIdAndUpdate(
        req.params.id ,
        req.body,
        {new : true}
    )

    res.status(200).json(updateCont);
})

const delCont = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(contact.user_id.toString() !== req.user.id)
        {
            res.status(403);
            throw new Error("Updation by unspecified user");
        }
        
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
})

module.exports = {getCont, getContone, createCont, updateCont, delCont};