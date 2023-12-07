const DBconnect = require('./db')
const express = require('express')
const app = express()
const cors = require('cors');
DBconnect();

app.use(cors());
app.use(express.json())
// Admin Routes
app.use('/api/admin/auth', require('./routes/admin/Auth'));
app.use('/api/admin/doctor', require('./routes/admin/Doctor'));
app.use('/api/admin/patient', require('./routes/admin/Patient'));
app.use('/api/admin/appointment', require('./routes/admin/Appointment'));

// Doctor Routes
app.use('/api/doctor/auth', require('./routes/doctor/Auth'));
app.use('/api/doctor/appointment', require('./routes/doctor/Appointment'));
app.use('/api/doctor/patients', require('./routes/doctor/Patient'));
app.use('/api/doctor/chat', require('./routes/doctor/Chat'));

// Patient Routes
app.use('/api/patient/auth', require('./routes/patient/Auth'));
app.use('/api/patient/appointment', require('./routes/patient/Appointment'));
app.use('/api/patient/doctor', require('./routes/patient/Doctor'));
app.use('/api/patient/chat', require('./routes/patient/Chat'));

// Payment Route
app.use('/payments', require('./routes/payment/Payment'));

app.get('/', (req, res) => {
  res.send("Welcome to iNotebook API");
})

const server = app.listen(5000, () => {
  console.log(`medret is listening on port 5000`)
})

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: '*',
  }
})

io.on('connection', (socket) => {
  console.log("Socket connected: " + socket.id);
  socket.on('setup', (userID) => {
    socket.join(userID);
    socket.emit('connected');

  })

  socket.on('joinChat', (room) => {
    socket.join(room);
    console.log("Joined room: " + room);
  })

  socket.on('newMessage', (newMessage, sender, reciever, chatId) => {
    console.log('message send to', reciever, ' by ', sender, ' in chat ', chatId);
    io.to(reciever).emit('messageRecieved', newMessage, sender, chatId)
  })
})