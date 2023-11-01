const Hospital = require('../models/hospital')
const User = require('../models/user')
const bcrypt = require('bcryptjs');

module.exports = {
    index :(req, res) => {
        return res.render('./login');
    },

    get_register :(req, res) => {
        return res.render('./registration');        
    }, 
    

    dash: async(req, res) => {
        const context = {}
        try {
            const _hospitals = await Hospital.find();
            console.log(_hospitals);
            context['hospitals'] = _hospitals
            return res.render('./dash', {context});
        }   catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message})
        }
    },

    profile: async (req, res) => {
        const context = {}

        try {
            const user = await User.findOne({ _id: req.admin })
            // console.log(user);           
            context['user'] = user
            return res.render('./profile', { context });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message })
        }
    },     

    updateProfile: async (req, res) => {

        const { fullName, email, admin_id, phoneNo } = req.body; 

        //    ==========Data cleaning====== 
        const nameReg = /^[a-zA-Z\s]+$/;
        const email_Reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneNoReg = /^[0-9]+$/;
        


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
             

            //  ========== Insert the user to the bd======
            const user = await User.findOneAndUpdate({_id: admin_id},{ fullName, email, phoneNo});
             console.log(user);
            return res.status(200).json({
                success: true,
                message: 'Profile Saved successfully',
            });


        }   catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    },

    change_password: async (req, res) => {
        const { old_password, newPassword } = req.body;

        try {
            const pwdReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;

            if (!pwdReg.test(newPassword)) {
                throw Error = 'Enter a valid password'
            }

            const user = await Admin.findOne({_id: req.admin})

            if (user) {
                const auth = await bcrypt.compare(old_password, user.password)
                if (auth) {
                    const salt = await bcrypt.genSalt();

                    const _newPassword = await bcrypt.hash(newPassword, salt);

                    const chngedPassword = await Admin.findOneAndUpdate({ _id: req.admin }, { password: _newPassword })

                    return res.status(200).json({ success: true, msg: 'Password Changed Successfully', redirectURL: '/profile' })
                }
                throw Error('Incorrect Password')
            } else {
                throw Error('Admin Not Found')
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    }
}  