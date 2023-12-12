const AdminModel = require('../Models/AdminModel');

async function test(req,res){
    const temp={
        id:'admin',
        email:'admin@admin',
        password:'admin',
        firstName:'joe',
        lastName:'jones',
    }
    // const admin=new AdminModel(temp)
    // try{
    //     await admin.save()
    //     res.status(200).send({message:'Admin Created'})
    // }catch (error){
    //     console.error(error)
    //     res.status(500).send({error:'Server Error'})
    // }
    res.status(200).send({message:'Henlo'})
}

module.exports = {
    test,
};