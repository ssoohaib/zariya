const UserModel = require('../Models/UserModel');

async function toggleFreeze(req, res) {
    console.log('------------------------');
    console.log('PUT - /toggle-freeze/:userId');

    const userId = req.params.userId;

    try {
        const user = await UserModel.findOne({ _id: userId });
        if (user.recipientApproval===true){
            user.recipientApproval=false;
        }else{
            user.recipientApproval=true;
        }
        await user.save();
        res.status(200).send({ message: `User ${user.email} isFrozen: ${user.recipientApproval}` });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'User Not Found' });
    }
}

module.exports = {
    toggleFreeze,
};