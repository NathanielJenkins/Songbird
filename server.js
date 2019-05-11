const env = require('dotenv').config(); 
const express = require('express');
const query = require('./app/tools/query');
query.querydb('text', 'values')
app = express()

port = process.env.PORT;    

app.listen(port);
console.log("starting the server on port: " + port)


