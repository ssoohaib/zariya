const express = require("express");
const router = express.Router();
const {authMiddleware}=require('../Middleware/AuthMiddleware')
const { updateProfile, updatePassword, acceptDonation } =require('../Controller/RecipientController')


router.put('/update/:id', updateProfile);
router.put('/update-password/:id', updatePassword);
router.put('/accept-donation/:id', acceptDonation);



module.exports = router;