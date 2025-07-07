const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    artist : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    audioUrl : {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    albumId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'album',
        required :false
    },
} , {timestamps : true})
const song = mongoose.model('song', songSchema);

module.exports = song