const express = require("express");
const router = express.Router();
const {toggleFreeze}=require('../Controller/AdminController')
const {authMiddleware}=require('../Middleware/AuthMiddleware')


router.put("/toggle-freeze/:userId", authMiddleware, toggleFreeze)

module.exports = router;