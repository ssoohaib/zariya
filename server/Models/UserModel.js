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
    registrationDate:{
        type:Date,
        default:Date.now
    },
    favouriteNgos:{
        type:Array,
        required:false
    },
    donationsMade:{
        type:Array,
        required:false
    },
    subscribedNgos:{
        type:Array,
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
    recipientApproval:{
        type:Boolean,
        default:false,
        required:false
    },
    donationsReceived:{
        type:Array,
        required:false
    },
    subscribedUsers:{
        type:Array,
        required:false
    },
    ngoPaymentMenthods:{
        type:Array,
        required:false
    }
})

module.exports=mongoose.model('User',UserSchema)