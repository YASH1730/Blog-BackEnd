const mongoose = require('mongoose');

const user  = mongoose.Schema({
    fullName : String,
    email : { type: String, unique: true },
    phoneNumber : String,
    password : String
})

module.exports = mongoose.model('userData',user);
