
const router  = require('express').Router();
const UserModel = require('../models/User');
const {validationRegister} = require('../config/validation')

 
router.post('/register' , async (req, res)=>{

    //step 01 : validation 
    //distructring object
    const { error } =   validationRegister(req.body);
    if(error) return res.status(400).json({error : error.details[0].message});
    
    //check if email exist 
    const emailExist = await UserModel.findOne({
        where : {
            email : req.body.email
        }
    });
    if(emailExist) return res.status(400).json({
        success : false,
        message : 'email already exists'
    });

    //hash the password 

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