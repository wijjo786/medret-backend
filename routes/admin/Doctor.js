const express = require('express');
const router = express.Router();
const doctor = require('../../models/Doctor');

// Get all doctors
router.get('/getAllDoctors', async (req, res) => {
  try {
    const doctors = await doctor.find({})
    res.send(doctors)
  } catch (error) {
    res.status(500).send("Internal Server Error occurred", error);
  }
})

// Add a Doctor

router.post('/addDoctor', async (req, res) => {
  const { firstName, middleName, lastName, username, experience, availableTime, email, password, gender, phone, cnic, address, hospitalCode, hospitalName, specialization, description, age, payment } = req.body;
  try {
    let newDoctor = await doctor.create({
      firstName, middleName, password, lastName, experience, availableTime, username, email, gender, phone, cnic, address, hospitalCode, hospitalName, specialization, description, age, payment
    });
    res.status(200).send({ newDoctor });
  } catch (error) {
    res.status(500).send("Internal Server Error occurred");
  }
});

// Update a Doctor

router.put('/updateDoctor/:id', async (req, res) => {
  try {
    //Creating a new note object:
    const newDoctor = {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      cnic: req.body.cnic,
      address: req.body.address,
      hospitalCode: req.body.hospitalCode,
      hospitalName: req.body.hospitalName,
      specialization: req.body.specialization,
      description: req.body.description,
      availableTime: req.body.availableTime,
      experience: req.body.experience,
    }
    let dcc = await doctor.findByIdAndUpdate(req.params.id, { $set: newDoctor }, { new: true })
    res.send(dcc)
  } catch (error) {
    res.status(500).send("Internal Server Error Occurred. Please Try Again.")
    console.log(error);
  }
})

// Delete a Doctor

router.delete('/deleteDoctor/:id', async (req, res) => {
  let status = false
  try {
    await doctor.findByIdAndDelete(req.params.id)
    status = true
    res.send({ status: status })
  } catch (error) {
    res.status(500).send("Internal Server Error Occurred. Please Try Again.")
    console.log(error);
  }
})

// getDoctorName

router.get('/getDoctorName/:id', async (req, res) => {
  try {
    const doctors = await doctor.findById(req.params.id)
    res.send({ name: doctors.firstName + " " + doctors.lastName })
  } catch (error) {
    res.status(500).send("Internal Server Error occurred", error);
  }
})

module.exports = router
