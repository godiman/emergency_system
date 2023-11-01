const route = require('express').Router();
const adminCont = require('../controllers/adminCont');
const {auth} = require('../middlewares/authMiddlewares')

route.get('/', adminCont.index);

route.get('/registration', adminCont.get_register);

route.get('/dash', auth,  adminCont.dash); 

route.get('/profile', auth,  adminCont.profile); 
route.post('/update-profile', auth, adminCont.updateProfile)
route.post('/change-password', auth, adminCont.change_password);

// router.post('/change-password', auth, adminCont.change_password);




module.exports = route;  