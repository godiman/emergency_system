
const jwt = require('jsonwebtoken');

const auth = (req, res, next) =>{
    try {
    const token = req.header('auth-token');
    console.log(token);
        if(!token) return res.status(401).json({msg: 'No auth token! Access denied'});
    
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        if(!verified) return res
            .status(401)
            .json({msg: 'Token verification failed, authorization danied'});
    
        req.user = verified.id;
        req.token = token;
        next();
    } catch (err) {
        res.status(500).json({error: err.message});
    }

}

module.exports = {auth};