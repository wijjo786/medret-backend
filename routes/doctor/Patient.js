const express = require('express');
const router = express.Router();
const patient = require('../../models/Patient');
const fetchuser = require('../../middleware/fetchuser');
const health = require('../../models/Health');
router.get('/fetchPatients', fetchuser, async (req, res) => {
  try {
    const patients = await patient.find({ doctor: req.Doctor.id });
    res.json(patients);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occurred");
  }
})

router.get('/fetchPatientHealth/:id', async (req, res) => {
  try {
    const healthData = await health.find({ userId: req.params.id });
    res.json(healthData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occurred");
  }
})

module.exports = router
