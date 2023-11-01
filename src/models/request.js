const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    emergency_type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    ambulance: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});


const EmergencyRequest = mongoose.model('emergency_request', userSchema);
 
module.exports = EmergencyRequest;