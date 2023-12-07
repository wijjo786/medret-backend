const express = require('express');
const bcrypt = require('bcrypt');
const user = require('../../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../../middleware/fetchuser');
const JWT_SECRET = "thisiswebtokensecret";

var jwt = require('jsonwebtoken');
router.post('/login', [
  body('email', 'Enter a Valid Email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  let success = false;
  //Is there are errors return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Req.body contains email and password so extracting them
  const { email, password } = req.body;
  try {
    let loggedinuser = await user.findOne({ email })
    if (!loggedinuser) {
      return res.status(400).json({ success, error: "Please try to login with correct credentials" })
    }
    const passwordCompare = password === loggedinuser.password
    if (!passwordCompare) {
      return res.status(400).json({ success, error: "Please try to login with correct credentials" })
    }
    //it is the data of user.... We will send the id of user
    const data = {
      Doctor: {
        id: loggedinuser._id
      }
    }
    success = true;
    const token = jwt.sign(data, JWT_SECRET);
    res.json({ success, token, name: loggedinuser.fullName });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error occurred");
  }
})

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userID = req.Doctor.id;
    const loggedinuser = await user.findOne({ _id: userID })
    res.send(loggedinuser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error occurred");
  }
})

router.put('/updateProfile', fetchuser, async (req, res) => {

  try {
    let newData = {}
    if (req.body.fullName) {
      newData.fullName = req.body.fullName
    }
    if (req.body.hospitalName) {
      newData.hospitalName = req.body.hospitalName
    }
    if (req.body.password) {
      newData.password = req.body.password
    }
    const userID = req.Doctor.id;
    let newDoc = await user.findByIdAndUpdate(userID, { $set: newData }, { new: true });
    res.send(newDoc)
  } catch (error) {
    res.status(500).send("Internal Server Error occurred");
  }
})

module.exports = router;