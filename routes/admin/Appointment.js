const express = require('express');
const router = express.Router();
const appointment = require('../../models/Appointment');

// Get all Appointments
router.get('/getAllAppointments', async (req, res) => {
  try {
    const appointments = await appointment.find({})
    res.send(appointments)
  } catch (error) {
    res.status(500).send("Internal Server Error occurred");
  }
})

// Add a Appointment

router.post('/addAppointment', async (req, res) => {
  const { patientName, doctorName, treatment, date, doctor, status, patient } = req.body;
  try {
    let newAppointment = await appointment.create({
      patientName, doctorName, treatment, date, doctor, status, patient
    });
    res.status(200).send({ newAppointment });
  } catch (error) {
    res.status(500).send("Internal Server Error occurred");
  }
});

//Update Appointment Status
router.put('/updateAppointmentStatus', async (req, res) => {
  const { id } = req.body;
  try {
    let updatedAppointment = await appointment.findByIdAndUpdate(id, {
      status: "Approved"
    });
    res.status(200).send({ updatedAppointment });
  } catch (error) {
    res.status(500).send("Internal Server Error occurred");
  }
});

//Delete Appointment

router.delete('/deleteAppointment/:id', async (req, res) => {
  let status = false
  try {
    let deletedAppointment = await appointment.findByIdAndDelete(req.params.id);
    status = true
    res.status(200).send({ status });
  } catch (error) {
    res.status(500).send("Internal Server Error occurred");
  }
})

// Get all Appointments of a specific Patient
router.get('/getAllAppointments/:id', async (req, res) => {
  try {
    const appointments = await appointment.find({ patient: req.params.id, status: "Ended" })
    res.send(appointments)
  } catch (error) {
    res.status(500).send("Internal Server Error occurred");
  }
})


module.exports = router
