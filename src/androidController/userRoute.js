
const route = require('express').Router();
const androidCont = require('../androidController/userCont');
const { auth } = require('../middlewares/androidMiddleware');

route.post('/register', androidCont.register);

route.post('/login', androidCont.login);

route.post('/valid-token', androidCont.validate_token);

route.get('/user', auth, androidCont.getUser);

route.get('/hospitals', auth, androidCont.getHospital);

route.post('/request-emergency', auth, androidCont.request_emergency); 



module.exports = route