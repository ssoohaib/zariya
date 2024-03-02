const UserModel=require('../Models/UserModel')

async function getAllUsers(req,res){
    console.log('------------------------')
    console.log("GET - /all-users")
    try{
        const users=await UserModel.find({},'-password')
        res.status(200).send(users)
    }catch(error){
        console.error(error)
        res.status(500).send({error})
    }
}

async function getAllNgos(req,res){
    console.log('------------------------')
    console.log(`[GET] -> /all-ngos/${req.params.id}`)
    // console.log(req.params.id)
    try{
        const ngos = await UserModel.find({ userType: 'recipient' }, '-password -recipientApproval -verificationImages -donationsReceived -subscribedUsers -subscribedNgos -donationsMade -favouriteNgos');
        res.status(200).send(ngos)
    }catch(error){
        console.error(error)
        res.status(500).send({error})
    }
}

module.exports={
    getAllUsers,
    getAllNgos
}