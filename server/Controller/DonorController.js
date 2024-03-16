const UserModel=require('../Models/UserModel')
const bcrypt = require('bcrypt');

async function updateInfo(req,res){
    console.log('------------------------')
    console.log(`[PUT] -> /update-info/${req.params.donorId}`)

    const donorId=req.params.donorId
    const donorInfo=req.body

    if (donorInfo.password) {
        const hashedPassword = await bcrypt.hash(donorInfo.password, 10);
        donorInfo.password = hashedPassword;
    }

    try {
        await UserModel.updateOne(
            { _id: donorId },
            { $set: donorInfo },
            { new: true },
            (err, updatedDocument) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(updatedDocument);
                }
            }
        )

        return res.status(200).json({ message: 'User info updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function makeDonation(req,res){
    console.log('------------------------')
    console.log(`[POST] -> /post-nonmon-donation/${req.params.donorId}`)

    const donorId=req.params.donorId
    const donation=req.body

    try {
       await UserModel.updateOne(
        { _id: donorId},
        { $push: { donationsMade: donation } },
        { new: true },
        (err, updatedDocument) => {
            if (err) {
            console.error(err);
            } else {
            console.log(updatedDocument);
            }
        }
       )

        return res.status(200).json({ message: 'Donation made successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function toggleFavouriteNgo(req,res){
    console.log('------------------------')
    console.log(`[PUT] -> /fav-ngo/${req.params.donorId}/${req.params.ngoId}`)
    
    const donorId=req.params.donorId
    const ngoId=req.params.ngoId

    try {
        const user = await UserModel.findById(donorId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const index = user.favouriteNgos.indexOf(ngoId);
        if (index === -1) {
            user.favouriteNgos.push(ngoId);
        } else {
            user.favouriteNgos.splice(index, 1);
        }

        await user.save();

        return res.status(200).json({ message: 'Favourite NGO toggled successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function activateSubscription(req,res){
    console.log('------------------------')
    console.log(`[POST] -> /activate-subscription/${req.params.donorId}`)

    const donation=req.body
    const donorId=req.params.donorId

    try {
       await UserModel.updateOne(
        { _id: donorId},
        { $push: { subscribedNgos: donation } },
        { new: true },
        (err, updatedDocument) => {
            if (err) {
            console.error(err);
            } else {
            console.log(updatedDocument);
            }
        }
       )

        return res.status(200).json({ message: 'Subscription activated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function deactivateSubscription(req,res){
    console.log('------------------------')
    console.log(`[PUT] -> /deactive-subscription/${req.params.donorId}/${req.params.ngoId}`)

    const donorId=req.params.donorId
    const ngoId=req.params.ngoId
    
    try {
       await UserModel.updateOne(
        { _id: donorId, 'subscribedNgos.ngoId': ngoId },
        { $set: { 'subscribedNgos.$.subscriptionStatus': 'In-Active' } },
        { new: true },
        (err, updatedDocument) => {
            if (err) {
            console.error(err);
            } else {
            console.log(updatedDocument);
            }
        }
       )

        return res.status(200).json({ message: 'Subscription deactivated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports={
    toggleFavouriteNgo,
    deactivateSubscription,
    activateSubscription,
    updateInfo,
    makeDonation
}