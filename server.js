const express = require('express');
const app = express();
const port  = process.env.PORT || 8080;
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(cors());
// database linking 
const database = require('./database/mongoDBConfig')


// for parsing application/json
app.use(bodyParser.json());

// for parsing the data from request body 
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.urlencoded());


app.use(require('./sever/routes/router'))


app.listen(port,()=>{
    console.log("Server is running at port 8080");
})