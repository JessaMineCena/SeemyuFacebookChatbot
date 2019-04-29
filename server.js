const express = require('express');
const MongoClient = require('mongodb').MongoClient; //use this to interact with the database
const bodyParser = require('body-parser');
//FOR SCHEMA
const mongoose = require('mongoose');
const scholarshipInfo = require('./model/scholarshipInfo');

const db = require('./config/db'); //to connect to db first requre the file then use the MongoClient

//mongoose instance connection url connection
mongoose.Promise=global.Promise;
mongoose.connect(db.url, {useNewUrlParser: true });

const app = express(); //intialize app as an instance of express framework

//start app to listen to HTTP requests
const port = 8000;

//use body parser cause express cant process urlencoded forms on its own
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
//import route to the server


MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
    if (err) return console.log(err)
    require('./app/routes')(app,database);
    app.listen(port, () => {
        console.log("We are live on port " + port);
    })
})

//use MongoClient
