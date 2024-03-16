const express = require("express");
const router = express.Router();
const {authMiddleware}=require('../Middleware/AuthMiddleware')
const {makeDonation, toggleFavouriteNgo, deactivateSubscription, activateSubscription, updateInfo}=require('../Controller/DonorController')

router.put('/update-info/:donorId',authMiddleware, updateInfo)

router.put('/fav-ngo/:donorId/:ngoId',authMiddleware, toggleFavouriteNgo)

router.post('/make-donation/:donorId',authMiddleware, makeDonation)
router.post('/activate-subscription/:donorId',authMiddleware, activateSubscription)
router.put('/deactivate-subscription/:donorId/:ngoId',authMiddleware, deactivateSubscription)

module.exports = router;