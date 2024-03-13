const express = require("express");
const router = express.Router();
const {authMiddleware}=require('../Middleware/AuthMiddleware')
const {toggleFavouriteNgo, deactivateSubscription, activateSubscription}=require('../Controller/DonorController')

// fav-ngo-toggle

// post-nonmon-donation
// post-mon-donation -> subscription

// DONOR CRUD (email,pass,fn,ln,city,contact)

router.put('/fav-ngo/:donorId/:ngoId',authMiddleware, toggleFavouriteNgo)

router.post('/activate-subscription/:donorId',authMiddleware, activateSubscription)
router.put('/deactivate-subscription/:donorId/:ngoId',authMiddleware, deactivateSubscription)

module.exports = router;