const mongoose = require('mongoose');
const URI = "mongodb+srv://talha:talha123@cluster0.vhg1c.mongodb.net/medret"

const connectmongo = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectmongo;
