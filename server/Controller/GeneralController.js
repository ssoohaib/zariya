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

async function getAllDonors(req, res) {
    console.log('------------------------')
    console.log(`[GET] -> /all-donors/${req.params.id}`)
    try {
        const donors = await UserModel.find({ userType: 'donor' }, '-password');
        res.status(200).send(donors);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
}

async function updateProfile(req, res) {
    const userId = req.params.id;
    const updates = req.body;
  
    try {
      // Find the user by ID and update the profile fields
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, { new: true });
  
      if (!updatedUser) {
        return res.status(404).send({ error: 'User not found' });
      }
  
      res.status(200).send(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }


module.exports={
    getAllUsers,
    getAllNgos,
    getAllDonors,
    updateProfile,
}