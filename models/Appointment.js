const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  patient: {
    type: String,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  doctor: {
    type: String,

  },
  doctorName: {
    type: String,
  },
  status: {
    type: String,
  },
  treatment: {
    type: String,
    required: true
  },

});


module.exports = mongoose.model('appointment', appointmentSchema);