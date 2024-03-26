const express = require("express");
const router = express.Router();
const {authMiddleware}=require('../Middleware/AuthMiddleware')
const {getDonationsDonor, acceptDonation, getDonationsNgo, makeDonation, toggleFavouriteNgo, deactivateSubscription, activateSubscription, updateInfo}=require('../Controller/DonorController')

const fetch = require("node-fetch");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

var uploadDirectory = './public/uploads';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.put('/update-info/:donorId',authMiddleware, updateInfo)

router.put('/fav-ngo/:donorId/:ngoId',authMiddleware, toggleFavouriteNgo)

router.get('/get-donations/ngo/:city',authMiddleware, getDonationsNgo)
router.get('/get-donations/donor/:donorId',authMiddleware, getDonationsDonor)
router.post('/make-donation/:donorId', upload.array('images',6), makeDonation)
router.put('/accept-donation',authMiddleware, acceptDonation)

router.post('/activate-subscription/:donorId',authMiddleware, activateSubscription)
router.put('/deactivate-subscription/:donorId/:ngoId',authMiddleware, deactivateSubscription)

module.exports = router;