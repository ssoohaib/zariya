const UserModel = require('../Models/UserModel')


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



module.exports = {
  updateProfile,
}
