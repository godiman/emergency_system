const route = require('express').Router();

const pageCont = require('../controllers/pageCont');

route.post('/register-hospital', pageCont.register_hospital); 

route.post('/register-ambulance', pageCont.register_ambulance); 


module.exports = route;