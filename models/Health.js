const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
  sugarLevel: {
    type: String,
    required: true
  },
  bloodPressure: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

const Health = mongoose.model('Health', healthSchema);

module.exports = Health;
