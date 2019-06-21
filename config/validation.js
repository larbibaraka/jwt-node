const Joi = require('@hapi/joi');

 

const validationRegister = (data) => {
    //validation 
    const Schema = {
        name : Joi.string().min(6).required(),
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6).required()
    }
    return Joi.validate(data, Schema);
  
}


const validationlogin = (data) => {
    //validation 
    const Schema = {
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6).required()
    }
    return Joi.validate(data, Schema);
}

module.exports.validationRegister = validationRegister;
module.exports.validationlogin = validationlogin;
