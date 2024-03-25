const mongoose=require('mongoose');

const DonationSchema=new mongoose.Schema({
    ngoId:{
        type:String,
        required:true
    },
    ngoName:{
        type:String,
        required:true
    },
    donorId:{
        type:String,
        required:true
    },
    donorName:{
        type:String,
        required:true
    },
    donorDp:{
        type:String,
        required:false
    },
    donationCategory:{
        type:String,
        required:true
    },
    donationDate:{
        type:Date,
        default:Date.now
    },
    donation:{
        type:Object,
        required:true
    }
})

module.exports=mongoose.model('Donation',DonationSchema)