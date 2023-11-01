const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const EmergencyRequest = require('../models/request');

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
            const user = await User.create({ fullName, email, phoneNo, password });
            console.log(user);
            return res.status(200).json({
                success: true,
                message: 'Account created successfully',
            });
        } catch (error) {
        console.log(error);
            return res.status(500).json({ error: error.message });
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
            const loginUser = await User.login(email, password);

            const token = jwt.sign(
                { id: loginUser._id },
                process.env.SECRET_KEY,
                {
                    expiresIn: 60 * 60 * 24,
                }
            );

            return res.status(200).json({
                token,
                ...loginUser,
                success: true,
                message: 'Access granted',
            });

        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    },

     // validate token
     validate_token: async (req, res) => {
        try {
            const token = req.header("auth-token");
            if (!token) return res.json(false);
            const verified = jwt.verify(token, process.env.SECRET_KEY);
            if(!verified) return res.json(false);

            // Check if the user exist
            const user = await User.findById(verified.id);
            console.log(user)  
            
            if(!user) return res.json(false);
            res.json(true);
        } catch (ejs) {
            return res.status(500).json({error: e.message});
        }
    },

    // ===get user===========
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user);
            // console.log(user);
            return res.json({...user._doc, token: req.token});
        } catch (error) {
            
        }
    },

    // ==========Get hospital========
    getHospital: async(req, res) => {
        try {
            const hospital = await Hospital.find();
            // console.log(hospital);
            return res.status(200).json(hospital);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    },

    
    request_emergency: async (req, res) => {  
        console.log(req.body);
     
        const {emergency_type, location, gender, age, ambulance, description} = req.body;    
        try {
             //  ========== Insert the user to the bd======
             const emergency = await EmergencyRequest.create({user: req.user, emergency_type, location, gender, age, ambulance, description});
             
             return res.status(200).json({
                success: true, 
                message: 'Registration successfully',
                data: emergency
             });

        } catch (error) {
             console.log(error);
             return res.status(501).json({error: error.message});
        }                   
    }, 

}