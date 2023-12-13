const express = require("express");
const router = express.Router();
const {signUpUser, signInUser, signOutUser}=require('../Controller/AuthUserController')
const {authMiddleware}=require('../Middleware/AuthMiddleware')

router.post("/signup", signUpUser)
router.post("/signin", signInUser)
router.get("/signout", signOutUser)

router.get("/protected", authMiddleware, (req,res)=>{
    res.send({userId:req.userId})
})

module.exports = router;