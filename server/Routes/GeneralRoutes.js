const express = require("express");
const router = express.Router();
const {authMiddleware}=require('../Middleware/AuthMiddleware')
const {getAllUsers, getAllNgos}=require('../Controller/GeneralController')

// router.get('/all-users', authMiddleware, getAllUsers)
router.get('/all-users', getAllUsers)
router.get('/all-ngos', getAllNgos)

module.exports = router;