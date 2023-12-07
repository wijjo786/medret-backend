const mongoose = require("mongoose");
const { Schema } = mongoose;

const patientSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
  },
  cnic: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
  },
  description: {
    type: String,
  },
  age: {
    type: String,
  },
});

module.exports = mongoose.model("patient", patientSchema);
