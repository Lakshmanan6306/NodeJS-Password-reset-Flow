const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();
require('./config/dbConfig');
const user = require('./routes/user');

app.use(express.json());
app.use(cors());
app.use('/user',user);



app.listen((process.env.PORT || 8020),()=>{
    console.log(`Server Started Working in ${process.env.PORT || 8020} PORT`)
})