const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs'); 


const ambulanceSchema = mongoose.Schema({
    hospital_name: {
        type: String,
        required: true
    },
    driver_name: {
        type: String,
        required: true
    },
    driver_phoneNo: {
        type: String,
        required: true,
    },
    plate_no: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});



const ambulance = mongoose.model('ambulance', ambulanceSchema);
 
module.exports = ambulance;