const { truncate } = require('fs');
const UserModel = require('../Models/UserModel')
const DonationModel = require('../Models/DonationModel')
const bcrypt = require('bcrypt');

async function acceptDonation(req,res){
  console.log('------------------------')
  console.log('[POST] -> /accept-donation/'+req.params.id)
  console.log(req.body)
  const donationId = req.body._id;

  try{
    await DonationModel.findByIdAndUpdate({_id: donationId.toString()}, req.body, {new: true})

    res.status(200).json({message: 'Donation accepted successfully'})
  }
  catch(error){
    console.error('Error accepting donation:', error)
    res.status(500).json({message: error})
  }
}

async function updateProfile(req, res) {

  const id = req.params.id; 
  const newData = req.body; 

  const filter = { _id: id.toString() };
  const options = { upsert: false };
  
  UserModel.updateOne(filter, { $set: newData }, options)
      .then(result => {
          res.status(200).json({ message: 'Data updated successfully' });
      })
      .catch(error => {
          console.error('Error updating data:', error);
          res.status(500).json({ message: error });
      });
}

async function updatePassword(req, res) {
  const id = req.params.id;
  //const { body } = req.password;
  //console.log(password)
  

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the new password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword)

    // Update the user's password in the database
    const temp = await UserModel.findByIdAndUpdate(id, { password: hashedPassword }, {new: true});
    console.log(temp)


    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}




module.exports = {
  updateProfile,
  updatePassword,
  acceptDonation
}
