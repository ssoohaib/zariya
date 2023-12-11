const mongoose = require('mongoose');

const URL='mongodb+srv://koreantunnel:ssRsIhXaUomeegll@cluster0.dpzezud.mongodb.net/test'
const connectDB = async () => {
    try{
        await mongoose.connect(URL);
        console.log('MongoDB connected!')
    }catch(err){
        console.log(err);
    }
}

module.exports = connectDB;