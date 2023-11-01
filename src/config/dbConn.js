const mongoose = require('mongoose');

const dbConnection = async() =>{
    await mongoose.connect('mongodb://127.0.0.1/Emergencyresponse_system');
}
 
module.exports = {dbConnection};