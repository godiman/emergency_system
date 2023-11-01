
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    const token = req.cookies.jwt;

    if (!token || token === undefined) {
        return res.redirect('/login');    
    }         

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (error, decodedToken) =>{
            if (error) {
                if (error.message === 'jwt expired') {
                    return res.redirect('/login');
                }
                return res.redirect('/login');
            }
            else{
                req.admin = decodedToken.id;
                next();
            }
        });
    }
    else{
        return res.redirect('/login');
    }
}
module.exports = {auth}