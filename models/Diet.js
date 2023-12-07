const mongoose = require('mongoose');
const { Schema } = mongoose;

const dietSchema = new Schema({

});


module.exports = mongoose.model('diet', dietSchema);