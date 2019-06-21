const express = require ('express');
const bodyParser = require('body-parser')
const app = express();
  
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
//import router 
const authRouter = require('./routes/auth');
app.use('/api/user', authRouter);
const PORT  = 3000;
app.listen(PORT, ()=>{
    console.log(`Server Up and Running on port : ${PORT}`);
})
