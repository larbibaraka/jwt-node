const router  = require('express').Router();
const verify = require('../config/verifyToken');

router.get('/' , verify ,(req, res)=>{
    res.json({
        title : "welcome",
        user: req.user
    })
})

module.exports = router;