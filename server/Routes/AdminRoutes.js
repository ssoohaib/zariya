const express = require("express");
const router = express.Router();
const {test}=require('../Controller/AdminController')

router.get("/", test)

module.exports = router;