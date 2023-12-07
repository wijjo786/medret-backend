const express = require('express');
const router = express.Router();
const patient = require('../../models/Patient');

// Get all doctors
router.get('/getAllPatients', async (req, res) => {
  try {
    const patients = await patient.find({})
    res.send(patients)
  } catch (error) {
    res.status(500).send("Internal Server Error occurred", error);
  }
})

// Add a Patient

router.post('/addPatient', async (req, res) => {
  const { firstName, lastName, username, password, email, description, doctor, treatment, gender, phone, cnic, address, age } = req.body;
  try {
    let newPatient = await patient.create({
      firstName, lastName, username, email, gender, password, description, doctor, treatment, phone, age, cnic, address
    });
    res.status(200).send({ newPatient });
  } catch (error) {
    res.status(500).send("Internal Server Error occurred");
  }
});

// Update a Doctor

router.put('/updatePatient/:id', async (req, res) => {
  try {
    //Creating a new note object:
    const newPatient = {
      firstName: req.body.firstName,

      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,

      phone: req.body.phone,
      cnic: req.body.cnic,
      address: req.body.address,


    }
    let dcc = await patient.findByIdAndUpdate(req.params.id, { $set: newPatient }, { new: true })
    res.send(dcc)
  } catch (error) {
    res.status(500).send("Internal Server Error Occurred. Please Try Again.")
    console.log(error);
  }
})

// Delete a Doctor

router.delete('/deletePatient/:id', async (req, res) => {
  let status = false
  try {
    await patient.findByIdAndDelete(req.params.id)
    status = true
    res.send({ status: status })
  } catch (error) {
    res.status(500).send("Internal Server Error Occurred. Please Try Again.")
    console.log(error);
  }
})


module.exports = router
