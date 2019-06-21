const Sequelize = require('sequelize');
const db = require('../db/sequelize');

const User = db.define('user', {
    name : {
        type : Sequelize.STRING,
        required : true,
        min : 6,
        max  : 255       
    },
    email : {
        type : Sequelize.STRING,
        required : true,
        isEmail : true,
        min : 6, 
        max : 255
    },
    password : {
        type : Sequelize.STRING,
        required : true,
        min : 6, 
        max : 255
    },
      // Timestamps
    createdAt: { 
        type : Sequelize.DATE
    },
    updatedAt: {
         type : Sequelize.DATE
    },
})

module.exports = User;