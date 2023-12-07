const express = require('express');
const bcrypt = require('bcrypt');
const doctor = require('../../models/Doctor');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../../middleware/fetchuser');

const JWT_SECRET = "thisiswebtokensecret";

var jwt = require('jsonwebtoken');


// //Creating a user using POST /api/auth/signup request.
// router.post('/signup', [
//     body('email', 'Please Enter valid email').isEmail(),
//     body('password', 'Password must be lenght of 5 characters').isLength({ min: 5 }),
//     body('age', 'Plese Enter a valid AGE').isLength({ min: 2 })
// ], async (req, res) => {
//     let success = false;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//         let exist = await user.findOne({ email: req.body.email });
//         if (exist) {
//             return res.status(400).json({ success, error: "Sorry a user with this email already exists" });
//         }
//         const salt = await bcrypt.genSalt(10);
//         const secPass = await bcrypt.hash(req.body.password, salt);
//         let newuser = await user.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: secPass,
//         });
//         const data = {
//             user: {
//                 id: newuser._id
//             }
//         }
//         success = true
//         const token = jwt.sign(data, JWT_SECRET);
//         res.send({ success, token });
//     } catch (error) {
//         res.status(500).send("Internal Server Error Occurred. Please Try Again.")
//     }
// })

//Route 2: Authenticate a user using POST using "/api/auth/login"
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
        let loggedinuser = await doctor.findOne({ email })
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
        res.json({ success, token, name: loggedinuser.firstName + " " + loggedinuser.lastName, userId: loggedinuser._id });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occurred");
    }
})

// Route 3: Get user details using POST using "/api/auth/getuser"
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userID = req.Doctor.id;
        const loggedinuser = await doctor.findOne({ _id: userID })
        res.send(loggedinuser);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occurred");
    }
})

router.put('/updateProfile', fetchuser, async (req, res) => {

    try {
        let newData = {}
        if (req.body.firstName) {
            newData.firstName = req.body.firstName
        }
        if (req.body.lastName) {
            newData.lastName = req.body.lastName
        }
        if (req.body.email) {
            newData.email = req.body.email
        }
        if (req.body.address) {
            newData.address = req.body.address
        }
        if (req.body.cnic) {
            newData.cnic = req.body.cnic
        }
        if (req.body.username) {
            newData.username = req.body.username
        }
        if (req.body.phone) {
            newData.phone = req.body.phone
        }
        const userID = req.Doctor.id;
        let newDoc = await doctor.findByIdAndUpdate(userID, { $set: newData }, { new: true });
        res.send(newDoc)
    } catch (error) {
        res.status(500).send("Internal Server Error occurred");
    }
})

module.exports = router