const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs'); 


const hospitalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    }, 
    phoneNo: {
        type: String, 
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});

   


// =========Login methods==========


const Hospital = mongoose.model('hospital', hospitalSchema);
 
module.exports = Hospital;