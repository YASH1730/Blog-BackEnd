require('dotenv').config();
const colors = require('colors');
const mongoose = require('mongoose')

mongoose.connect(process.env.URI , { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>console.log('> Connected...'.bgBlue))
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red ))