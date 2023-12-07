const express = require('express');
const router = express.Router();
const fetchuser = require('../../middleware/fetchuser');
const chat = require('../../models/Chat');
const doctor = require('../../models/Doctor');
const patient = require('../../models/Patient');
// Route 1: Get all the chats of a doctor with a patient using: GET "/api/doctor/chat/getChats". Login required;

router.get('/getChats:id', fetchuser, async (req, res) => {
  try {
    const chats = await chat.find({ doctorId: req.Doctor.id, patientId: req.params.id });
    res.json(chats);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// Route 2: Initialize a new chat using: POST "/api/doctor/chat/addChat". Login required;

router.post('/startNewChat', fetchuser, async (req, res) => {
  try {
    const { patientId } = req.body;
    const existChat = await chat.find({ patientId: patientId, doctorId: req.Doctor.id });
    if (existChat.length !== 0) return res.json({ success: false });

    console.log(patientId);
    const newChat = new chat({
      patientId,
      doctorId: req.Doctor.id,
      patientName: req.body.patientName,
      doctorName: req.body.doctorName,
      messages: []
    })
    const savedChat = await newChat.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error.message, 'error');
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
    res.json(savedChat);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// Route 4 Get all chats

router.get('/getAllChats', fetchuser, async (req, res) => {
  try {
    const chats = await chat.find({ doctorId: req.Doctor.id });
    res.json(chats);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// Route 5 Search a Chat

router.get('/searchChat/:name', fetchuser, async (req, res) => {
  try {
    const nameParts = req.params.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const findPatient = await patient.find({
      $and: [
        { firstName: { $regex: new RegExp(firstName, 'i') } },
        { lastName: { $regex: new RegExp(lastName, 'i') } }
      ]
    });

    res.json(findPatient);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


module.exports = router