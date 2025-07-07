const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required: true
    },
    clerkId : {
        type : String,
        required: true,
        unique : true
    }
}, {timestamps: true})

const user = mongoose.models.user || mongoose.model('user', userSchema);

module.exports = user;