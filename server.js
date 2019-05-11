const env = require('dotenv').config(); 
const express = require('express');
app = express()

//add the routes

app.use("/", require('./app/routes/approutes'));

//run the server
port = process.env.PORT;    
app.listen(port);
console.log("starting the server on port: " + port)