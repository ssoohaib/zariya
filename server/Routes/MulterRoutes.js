const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

var uploadDirectory = './uploads';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/test', upload.array('image',3), (req, res) => {
    console.log(req.files)
    console.log(JSON.parse(req.body.text))
    res.json({message: 'File uploaded successfully' });
});


module.exports = router;
