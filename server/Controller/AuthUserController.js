const UserModel=require('../Models/UserModel')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const uid=require('uid')

async function signUpDonor(req,res){
    console.log('------------------------')
    console.log("POST - /signupd")

    const payload=req.body
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const tempUser={
        id:uid.uid(11),
        userType:payload.userType,
        email:payload.email,
        password:hashedPassword,
        firstName:payload.firstName,
        lastName:payload.lastName,
    }

    const user= new UserModel(tempUser)

    try{
        await user.save()
        res.status(200).send({message:`User Created(${payload.userType}): ${tempUser.email}`})
    }catch (error){
        console.error(error)
        res.status(500).send({error:'Email Already In Use'})
    }
}

async function signUpUser(req,res){
    console.log('------------------------')
    console.log("POST - /signup")
    const payload=JSON.parse(req.body.payload)
    console.log(req.files)

    const causesImages  = req.files.filter(file=>file.filename.slice(0,3)=='cau')
    const verificationImages  = req.files.filter(file=>file.filename.slice(0,3)=='ver')
    const logo = req.files.filter(file=>file.filename.slice(0,3)=='log')

    let tempUser={}

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    if (payload.userType == 'donor') {
        tempUser={
            id:uid.uid(11),
            userType:payload.userType,
            email:payload.email,
            password:hashedPassword,
            firstName:payload.firstName,
            lastName:payload.lastName,
        }
    }else{
        tempUser={
            id:uid.uid(11),
            userType:payload.userType,
            email:payload.email,
            password:hashedPassword,
            title:payload.title,
            description:payload.description,
            city:payload.city,
            causes:payload.causes,

            causesImages:causesImages,
            verificationImages:verificationImages,
        }
    }
    
    const user= new UserModel(tempUser)

    try{
        await user.save()
        res.status(200).send({message:`User Created(${payload.userType}): ${tempUser.email}`})
    }catch (error){
        console.error(error)
        res.status(500).send({error:'Email Already In Use'})
    }
}

async function signInUser(req,res){
    console.log('------------------------')
    console.log("POST - /signin")
    const payload=req.body
    const tempUser={
        email:payload.email,
        password:payload.password
    }

    try{
        const user=await UserModel.findOne({email:tempUser.email})
        if(user){
            const match = await bcrypt.compare(tempUser.password, user.password);
            if(match){
                const token=generateToken(user.id)
                console.log(`${user.userType}: ${user.email}`)
                console.log(`Token: ...${token.slice(-10)}`)
                res.status(200).send({
                    token:token,
                    user:user
                })
            }else{
                res.status(404).send({error:'Incorrect Password'})
            }
        }else{
            res.status(404).send({error:'User Not Found'})
        }
    }catch (error){
        console.error(error)
        res.status(500).send({error:'Server Error'})
    }
}

async function signOutUser(req,res){
    console.log('------------------------')
    console.log("POST - /signout")
    const payload=req.body
    const tokenToBlacklist = req.headers.authorization.split(' ')[1];

    console.log(`TokenToBlacklist: ...${tokenToBlacklist.slice(-10)}`)

    res.status(200).send({message:'Sign Out'})
}

module.exports={
    signUpUser,
    signInUser,
    signOutUser,
    signUpDonor
}