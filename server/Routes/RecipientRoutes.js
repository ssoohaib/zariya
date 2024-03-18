const express = require("express");
const router = express.Router();
const {authMiddleware}=require('../Middleware/AuthMiddleware')
const { updateProfile } =require('../Controller/RecipientController')


router.put('/update/:id', updateProfile);


module.exports = router;