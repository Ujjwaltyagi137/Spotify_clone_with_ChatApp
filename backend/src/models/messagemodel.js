const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId : {
        type : String,
        required: true
    },
    recieverId : {
        type : String,
        required: true
    },
    content : {
        type : String,
        required: true
    }
},{timestamps : true});

const message = new mongoose.model('message', messageSchema);

module.exports = message;