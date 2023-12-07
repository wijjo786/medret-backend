const express = require('express');
const router = express.Router();
const appointment = require('../../models/Appointment');
const fetchuser = require('../../middleware/fetchuser');
const report = require('../../models/Report');
// Fetch Appointments

router.get('/fetchAllAppointments', fetchuser, async (req, res) => {
  try {
    const appointments = await appointment.find({ patient: req.Doctor.id });
    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occurred");
  }
})

router.post('/addAppointment', fetchuser, async (req, res) => {
  const { patientName, doctorName, treatment, date, doctor, status } = req.body;
  try {
    let newAppointment = await appointment.create({
      patientName, doctorName, treatment, date, doctor, status, patient: req.Doctor.id
    });
    res.status(200).send({ newAppointment });
  } catch (error) {
    res.status(500).send("Internal Server Error occurred");
  }
});

router.get('/fetchAppointment/:id', fetchuser, async (req, res) => {
  try {
    const appointments = await appointment.find({ patient: req.Doctor.id, _id: req.params.id });
    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occurred");
  }
})


router.get('/fetchReport', fetchuser, async (req, res) => {
  try {
    const reports = await report.find({ patientId: req.Doctor.id });
    res.json(reports);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occurred");
  }
})


module.exports = router