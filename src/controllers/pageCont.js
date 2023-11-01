const User = require("../models/user");
const Hospital = require('../models/hospital');
const Ambulance = require('../models/ambulance');
// const jwt = require('jsonwebtoken');


module.exports ={

     register_hospital: async (req, res) => {       
          const {name, email,  address, phoneNo} = req.body;
               
          //    ==========Data cleaning====== 
          const namePattern = /^[a-zA-Z\s]+$/; 
          const email_Pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const addressPattern = /^[a-zA-Z0-9\s(),-./]+$/;
          const phoneNoPattern = /^[0-9]+$/;    

          try {
          if (!namePattern.test(name)) {
               throw new Error('Please fill form correctly');
          }
          if (!email_Pattern.test(email)) {
               throw new Error('Enter a valid email');
          }
          
          if (!addressPattern.test(address)) {
               throw new Error('Enter a valid location');
          }
          if (!phoneNoPattern.test(phoneNo)) {
               throw new Error('Enter a valid facuity');
          }

          //  ========== Insert the hospital to the bd======
          const user = await Hospital.create({user:req.admin, name, email, address, phoneNo});
               
          return res.status(200).json({
               success: true, 
               message: 'Registration successfully',
               data: user
          });
          

          } catch (error) {
          console.log(error);
               return res.status(501).json({error: error.message});
          }                   
    },

     register_ambulance: async (req, res) => {  
          console.log(req.body);
     
          const {hospital_name, driver_name, driver_phoneNo, plate_no} = req.body;
               
          //    ==========Data cleaning====== 
          const hnamePattern = /^[a-zA-Z\s]+$/; 
          const dnamePattern = /^[a-zA-Z0-9\s(),-./]+$/;
          const phoneNoPattern = /^[0-9]+$/;    
          const plate_noPattern = /^[a-zA-Z0-9\s-]+$/;

          try {
               if (!hnamePattern.test(hospital_name)) {
                    throw new Error('Enter hospital name');
               }
               if (!dnamePattern.test(driver_name)) {
                    throw new Error('Enter driver name');
               }
               if (!phoneNoPattern.test(driver_phoneNo)) {
                    throw new Error('Enter drivers phone number');
               }
               if (!plate_noPattern.test(plate_no)) {
                    throw new Error('Enter a plate number');
               }
               //  ========== Insert the ambulance to the bd======
               const user = await Ambulance.create({hospital_name, driver_name, driver_phoneNo, plate_no});
                  
               return res.status(200).json({
                    success: true, 
                    message: 'Registration successfully',
                    data: user
               });


          } catch (error) {
               console.log(error);
                    return res.status(501).json({error: error.message});
          }                   
     }

}