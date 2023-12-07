const express = require('express');
const router = express.Router();
const appointment = require('../../models/Appointment');
const fetchuser = require('../../middleware/fetchuser');
const report = require('../../models/Report');
// Fetch Appointments

router.get('/fetchApprovedAppointments', fetchuser, async (req, res) => {
  try {
    const appointments = await appointment.find({ doctor: req.Doctor.id, status: 'Approved' });
    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occurred");
  }
})

router.get('/fetchAllAppointments', fetchuser, async (req, res) => {
  try {
    const appointments = await appointment.find({ doctor: req.Doctor.id });
    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occurred");
  }
})

router.get('/fetchPastAppointment/:id', async (req, res) => {
  try {
    const appointments = await appointment.find({ patient: req.params.id });
    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occurred");
  }
})

router.get('/fetchReport:id', async (req, res) => {
  try {
    const reportData = await report.find({ appointment: req.params.id });
    res.json(reportData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occurred");
  }
})

//generate Report
router.post('/generateReport', fetchuser, async (req, res) => {
  try {
    const { mellitus, od, os, additionalInformation, medication, recommendation, appointment, comments, patientId, date } = req.body;
    if (req.body.exersicePlan) {
      const reportData = new report({
        mellitus, od, os, additionalInformation, medication, recommendation, appointment, comments, patientId, date, exersicePlan: req.body.exersicePlan, treatmentPlan: req.body.treatmentPlan, nutritionPlan: req.body.nutritionPlan
      })
      const savedReport = await reportData.save();
      res.json(savedReport)
    }
    else {
      const reportData = new report({
        mellitus, od, os, additionalInformation, medication, recommendation, appointment, comments, patientId, date
      })
      const savedReport = await reportData.save();
      res.json(savedReport)
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occurred");
  }
})

// End Appointment
//update status to ended
router.put('/endAppointment/:id', async (req, res) => {
  try {
    let updatedAppointment = await appointment.findByIdAndUpdate(req.params.id, {
      status: "Ended"
    });
    console.log('app added')
    res.status(200).send({ updatedAppointment });
  } catch (error) {
    res.status(500).send("Internal Server Error occurred");
  }
});

module.exports = router