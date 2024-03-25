const express = require("express");
const router = express.Router();
const {signUpUser, signInUser, signOutUser, signUpDonor}=require('../Controller/AuthUserController')
const {authMiddleware}=require('../Middleware/AuthMiddleware')
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

router.post("/signup", upload.array('images',6), signUpUser)
router.post("/signupd", signUpDonor)
router.post("/signin", signInUser)
router.get("/signout", signOutUser)




































router.get("/protected", authMiddleware, (req,res)=>{
    res.send({userId:req.userId})
})

const YOUR_CLIENT_ID = "835480477309-ff24rl3qfctjd9ohl55f2eq1rk593g1m.apps.googleusercontent.com";

const YOUR_CLIENT_SECRET = "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";

async function signUp(code, res) {
  
  const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${YOUR_CLIENT_ID}&client_secret=${YOUR_CLIENT_SECRET}&redirect_uri=http://localhost:3001/google&grant_type=authorization_code`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log("data : ", data);

  // get the id token from the response
  const { id_token } = data;

  // verify the id token
  const verifyResponse = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`
  );

  const verifyData = await verifyResponse.json();
  console.log("verifyData : ", verifyData);

  // get the user data from the verify data
  const { name, email, picture } = verifyData;

  // This res.send is the key to redirecting back to our expo go app.
// ex: you have to enter your IP adress that is running your expo go application.
  res.send(`<script>window.location.replace("exp://?email=${email}&name=${name}&picture=${picture}")</script>`);

}

router.get("/oauth", async (req, res) => {
    console.log("req.query : ", req.query);
   
     // use the code to get the access token
   
     const { code } = req.query;
   
     if (!code) {
       return res.status(400).json({
         error: "invalid code",
       });
     }
   
     signUp(code, res);
   
   });

module.exports = router;