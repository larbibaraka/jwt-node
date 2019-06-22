const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
//import routes
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');  
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
app.use(bodyParser.json())

app.use('/api/user', authRouter);
app.use('/api/posts', postsRouter);

const PORT  = 3000;
app.listen(PORT, ()=>{
    console.log(`Server Up and Running on port : ${PORT}`);
})
