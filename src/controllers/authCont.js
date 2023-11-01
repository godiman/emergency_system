const userModel = require("../models/user");

const jwt = require('jsonwebtoken');


module.exports = {

     register: async (req, res) => {

          const { fullName, email, phoneNo, password } = req.body;

          //    ==========Data cleaning====== 
          const nameReg = /^[a-zA-Z\s]+$/;
          const email_Reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const phoneNoReg = /^[0-9]+$/;
          const pwdReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;


          try {
               if (!nameReg.test(fullName)) {
                    throw new Error('Enter your full name');
               }
               if (!email_Reg.test(email)) {
                    throw new Error('Enter a valid email');
               }
               if (!phoneNoReg.test(phoneNo)) {
                    throw new Error('Enter a valid phone number');
               }
               if (!pwdReg.test(password)) {
                    throw new Error('Password must contain uppercase, lowercasre and digit');
               }



               //  ========== Insert the user to the bd======
               const admin = await userModel.create({ fullName, email, phoneNo, password });
               console.log(admin);
               return res.status(200).json({
                    success: true,
                    message: 'Account created successfully',
                    data: admin
               });
          } catch (error) {
               return res.status(501).json({ error: error.message });
          }
     },
     
     login: async (req, res) => {
          const { email, password } = req.body;

          // ==========Data cleaning======
          const email_Reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const pwdReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;

          try {
               if (!email_Reg.test(email)) {
                    throw new Error('Enter a valid email');
               }
               if (!pwdReg.test(password)) {
                    throw new Error('Password must contain uppercase, lowercasre and digit');
               }

               // ======Call login methodes========
               const loginAdmin = await userModel.login(email, password);
               console.log(loginAdmin);

               const token = jwt.sign(
                    { id: loginAdmin._id },
                    process.env.SECRET_KEY,
                    {
                         expiresIn: 60 * 60 * 24,
                    }
               );

               res.cookie('jwt', token);

               return res.status(200).json({
                    success: true,
                    message: 'Access granted',
                    token
               });

          } catch (error) {
               console.log(error);
               return res.status(501).json({ error: error.message });
          }
     },

     logout: async (req, res) =>{    
          res.cookie('jwt', '', {maxAge: 4})
          return res.redirect('/login');
         }   

}