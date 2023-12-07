const express = require('express');
const router = express.Router();
const fetchuser = require('../../middleware/fetchuser');
const chat = require('../../models/Chat');
const doctor = require('../../models/Doctor');
// Route 1: Get all the chats of a doctor with a patient using: GET "/api/doctor/chat/getChats". Login required;

router.get('/getChats:id', fetchuser, async (req, res) => {
  try {
    const chats = await chat.find({ patientId: req.Doctor.id, doctorId: req.params.id });
    res.json(chats);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// Route 2: Initialize a new chat using: POST "/api/doctor/chat/addChat". Login required;

router.post('/startNewChat', fetchuser, async (req, res) => {
  try {
    const { doctorId } = req.body;
    const existChat = await chat.find({ patientId: req.Doctor.id, doctorId: doctorId });
    if (existChat.length !== 0) return res.json({ success: false });
    const newChat = new chat({
      doctorId,
      patientId: req.Doctor.id,
      patientName: req.body.patientName,
      doctorName: req.body.doctorName,
      messages: []
    })
    const savedChat = await newChat.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// Route 3: Send a message to a patient using: POST "/api/doctor/chat/sendMessage". Login required;

router.post('/sendMessage', fetchuser, async (req, res) => {
  try {
    const { chatId, message } = req.body;
    const chatItem = await chat.findById(chatId);
    chatItem.messages.push({ isSend: true, isRecieved: false, message, sender: req.Doctor.id });
    const savedChat = await chatItem.save();
    res.json({ savedChat });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// Route 4: Get all the messages of a chat using: GET "/api/patient/chat/getMessages". Login required;

router.get('/getAllChats', fetchuser, async (req, res) => {
  try {
    console.log(req.Doctor.id)
    const chats = await chat.find({ patientId: req.Doctor.id });
    res.json(chats);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// Route 5 Search a Chat

router.post('/searchDoctor/:name', fetchuser, async (req, res) => {
  try {
    const nameParts = req.params.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const findPatient = await doctor.find({
      $and: [
        { firstName: { $regex: new RegExp(firstName, 'i') } },
        { middleName: { $regex: new RegExp(lastName, 'i') } }
      ]
    });

    res.json(findPatient);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


module.exports = router