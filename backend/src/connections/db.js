const mongoose = require('mongoose');

const connect = async ()=>{
    require('dotenv').config();
    try {
    const connection = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`mongo connect successfully ${connection.connection.host}`);
        
    } catch (error) {
        console.log("mongoose not connect");
        process.exit(1);
    }
}

module.exports = connect;