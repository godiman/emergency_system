
require('dotenv').config();

const express = require('express');

const { dbConnection } = require('./src/config/dbConn');
const authRoute = require('./src/routes/authRoute');
const pageRoute = require('./src/routes/pageRoute');
const adminRoute = require('./src/routes/adminRoute');
const androidRoute = require('./src/androidController/userRoute');


const cookieParser = require('cookie-parser'); 


const path = require('path');


const app = express();


const port = process.env.AAP_PORT || 4141

// ======Template engine========
app.set('view engine', 'ejs');

app.use(express.json());
app.use(cookieParser());


 
// ========Point express to static files=======
app.use(express.static(path.join(__dirname, '/public')));
 

// ==========configure route=================
app.use( pageRoute); 
app.use('/auth', authRoute);  
app.use( adminRoute);
app.use('/android', androidRoute);



 
 
//=================Db connection========
dbConnection()
 .then(() =>console.log('connected'))
 .catch((e)=>console.log('Error:', e)); 

app.listen(port, () => {
    console.log('Server started on port', port);
}) 