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

module.exports={
    getAllUsers
}