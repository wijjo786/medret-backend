const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema({
  mellitus: {
    type: String,
    required: true
  },

  od: {
    type: String,
    required: true
  },
  os: {
    type: String,
    required: true
  },
  additionalInformation: {
    type: String,
    required: true

  },
  medication: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  recommendation: {
    type: String,
    required: true

  },
  appointment: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true
  },
  patientId: {
    type: String,
    required: true

  },
  exersicePlan: {
    type: String,
  },
  treatmentPlan: {
    type: String,
  },
  nutritionPlan: {
    type: String,
  }
});


module.exports = mongoose.model('report', reportSchema);