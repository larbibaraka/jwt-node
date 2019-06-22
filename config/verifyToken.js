const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = (req, res , next)=>{
    const token  = req.header('auth-token');
    if(!token) return res.status(401).json({success : false, message : 'access Denied'});
        try {
        const verified = jwt.verify(token, process.env.TOEKN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).json({ success : false, message : "Invalid Token"})
    }

}

module.exports = auth;