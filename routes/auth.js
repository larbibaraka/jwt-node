
const router  = require('express').Router();
const UserModel = require('../models/User');

router.post('/register' , (req, res)=>{
     UserModel.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
     }).then(()=>{
        res.json({
            success : true

        })
    }).catch(err=>{
        res.json({
            success : false,
            error   : err   
        })
    })
});

router.post('/login', (req, res)=>{
    res.send('login');
})

module.exports = router;