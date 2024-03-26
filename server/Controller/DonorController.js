const UserModel=require('../Models/UserModel')
const DonationModel=require('../Models/DonationModel')
const bcrypt = require('bcrypt');

async function getDonationsNgo(req,res){
    console.log('------------------------')
    console.log(`[GET] -> /get-donations/ngo/${req.params.city}`)

    const city=req.params.city

    try {
        const donations = await DonationModel.find({ city: city, donationStatus:"Pending"});
        if (donations.length === 0) 
            return res.status(404).json({ message: 'No donations found' });
        return res.status(200).json({ donations });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function getDonationsDonor(req,res){
    console.log('------------------------')
    console.log(`[GET] -> /get-donations/donor/${req.params.donorId}`)

    try {
        const donations = await DonationModel.find({ donorId:req.params.donorId});        
        return res.status(200).json({ donations });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function acceptDonation(req,res){
    console.log('------------------------')
    console.log(`[PUT] -> /accept-donation`)

    const donation=req.body
    let updatedDoc={}

    try {
        await DonationModel.updateOne(
            { _id: donation.donationId },
            { $set: { ngoId:donation.ngoId, ngoName:donation.ngoName, donationStatus: 'Accepted' } },
            { new: true },
            (err, updatedDocument) => {
                if (err) {
                    updatedDoc=updatedDocument
                    console.error(err);
                } else {
                    console.log(updatedDocument);
                }
            }
        )

        const result = await DonationModel.findOne({ _id: donation.donationId });

        console.log(result)

        await UserModel.updateOne(
            { _id: donation.ngoId },
            { $push: { donationsReceived: result } },
            { new: true },
            (err, updatedDocument) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(updatedDocument);
                }
            }
        )

        return res.status(200).json({ message: 'Donation accepted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

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
    const donation=JSON.parse(req.body.payload)
    const images = req.files;

    // console.log(donation)
    // console.log(images)
    // return

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

       await DonationModel.create(donation);

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
    makeDonation,
    getDonationsNgo,
    getDonationsDonor,
    acceptDonation
}