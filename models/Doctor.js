const mongoose = require('mongoose');
const { Schema } = mongoose;

const doctorSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  cnic: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  hospitalCode: {
    type: String,
    required: true
  },
  hospitalName: {
    type: String,
    required: true
  }, specialization: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  availableTime: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true

  },
  reviews: {
    type: Array,
    default: [4.7, 4.3, 4.4]
  },
  payment: {
    type: String,
    required: true

  }
});


module.exports = mongoose.model('doctor', doctorSchema);