const express = require("express");
const router = express.Router();
const {authMiddleware}=require('../Middleware/AuthMiddleware')
const {getAllUsers}=require('../Controller/GeneralController')

router.get('/all-users', authMiddleware, getAllUsers)

module.exports = router;