const mongoose=require('mongoose');

const AdminSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    registrationDate:{
        type:Date,
        default:Date.now
    }
    
    
});

module.exports=mongoose.model('Admin',AdminSchema);