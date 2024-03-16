const express = require("express");
const router = express.Router();
const {authMiddleware}=require('../Middleware/AuthMiddleware')
const {getAllUsers, getAllNgos, getAllDonors, updateProfile}=require('../Controller/GeneralController')

// router.get('/all-users', authMiddleware, getAllUsers)
router.get('/all-users', getAllUsers)
router.get('/all-ngos/:id',authMiddleware, getAllNgos)
router.get('/all-donors/:id', authMiddleware, getAllDonors)
router.put('/update-profile/:id', authMiddleware, updateProfile);

module.exports = router;