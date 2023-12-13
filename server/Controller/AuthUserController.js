const UserModel=require('../Models/UserModel')
const uid=require('uid')

async function signUpUser(req,res){
    const payload=req.body
    let tempUser={}

    if (payload.userType == 'donor') {
        tempUser={
            id:uid.uid(11),
            userType:payload.userType,
            email:payload.email,
            password:payload.password,
            firstName:payload.firstName,
            lastName:payload.lastName,
        }
    }else{
        tempUser={
            id:uid.uid(11),
            userType:payload.userType,
            email:payload.email,
            password:payload.password,
            title:payload.title,
            description:payload.description,
            causes:payload.causes,
            verificationImages:payload.verificationImages,
            causesImages:payload.causesImages,
        }
    }
    
    console.log(tempUser)
    const user= new UserModel(tempUser)

    try{
        await user.save()
        res.status(200).send({message:`User Created: ${payload.userType}`})
    }catch (error){
        console.error(error)
        res.status(500).send({error:'Email Already In Use'})
    }
}

async function signInUser(req,res){
    const payload=req.body
    const tempUser={
        email:payload.email,
        password:payload.password
    }

    console.log(tempUser)

    try{
        const user=await UserModel.findOne(tempUser)
        if(user){
            res.status(200).send(user)
        }else{
            res.status(404).send({error:'User Not Found'})
        }
    }catch (error){
        console.error(error)
        res.status(500).send({error:'Server Error'})
    }
}

module.exports={
    signUpUser,
    signInUser
}