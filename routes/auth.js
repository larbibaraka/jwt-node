const router  = require('express').Router();
const UserModel = require('../models/User');
const {validationRegister , validationlogin} = require('../config/validation')
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
require('dotenv').config();
 
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
    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    let passwordTosave = await bcrypt.hash(req.body.password , salt); 


    UserModel.create({
        name : req.body.name,
        email : req.body.email,
        password : passwordTosave
     }).then((user)=>{
        res.json({
            user : user,
            success : true

        })
    }).catch(err=>{
        res.json({
            success : false,
            error   : err   
        })
    })
});

router.post('/login', async (req, res)=>{
    
    //step 01 : validation 
    //distructring object
    const { error } =   validationlogin(req.body);
    if(error) return res.status(400).json({error : error.details[0].message});

      //check if email exist 
      const user = await UserModel.findOne({
        where : {
            email : req.body.email
        }
    });
    if(!user) return res.status(400).json({
        success : false,
        message : 'email does not exist'
    });

    // cehck password
    const validPass = await bcrypt.compare(req.body.password , user.password);

    if(!validPass) return res.status(400).json({ success : false, message : "password is worng"});

    // every thing is working super fine 

    //create and assign a token 
    const token = jwt.sign({ id : user.id , name : user.name }, process.env.TOEKN_SECRET);

    res.header('auth-token' , token).send(token);
    res.json({
        success : true,
        message : `hello mister : ${user.name}`
    })






})

module.exports = router;