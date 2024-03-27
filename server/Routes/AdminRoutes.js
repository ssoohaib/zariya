const express = require("express");
const router = express.Router();
const {toggleFreeze}=require('../Controller/AdminController')
const {authMiddleware}=require('../Middleware/AuthMiddleware');
const { toggleActivation } = require("../../utilities/AdminApis");


router.put("/toggle-freeze/:userId", toggleFreeze)

module.exports = router;
