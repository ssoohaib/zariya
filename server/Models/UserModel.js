const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    userType:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:false
    },
    lastName:{
        type:String,
        required:false
    },
    contactNumber:{
        type:String,
        required:false
    },
    city:{
        type:String,
        required:false
    },
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    causes: {
        type: Array,
        required: false,
    },
    verificationImages: {
        type: Array,
        required: false,
    },
    causesImages: {
        type: Array,
        required: false,
    },
    registrationDate:{
        type:Date,
        default:Date.now
    },
    recipientApproval:{
        type:Boolean,
        default:false,
        required:false
    },
})

module.exports=mongoose.model('User',UserSchema)