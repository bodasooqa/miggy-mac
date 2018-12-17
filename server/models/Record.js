const mongoose = require('mongoose');
const { Schema } = mongoose;

const Record = new Schema({
    username: String,
    email: String
});

module.exports = mongoose.model('Record', Record);