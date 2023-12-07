const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true
  },
  patientId: {
    type: String,
    required: true
  },
  patientName: {
    type: String,

  },
  doctorName: {
    type: String,

  },
  messages: [
    {
      isSend: {
        type: Boolean,
      },
      sender: {
        type: String,
      },
      message: {
        type: String,
      },
      time: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
