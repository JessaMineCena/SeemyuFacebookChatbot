const express = require('express');
const MongoClient = require('mongodb').MongoClient; //use this to interact with the database
const bodyParser = require('body-parser');

const db = require('./config/db'); //to connect to db first requre the file then use the MongoClient

const app = express(); //intialize app as an instance of express framework

//start app to listen to HTTP requests
const port = 8000;

//use body parser cause express cant process urlencoded forms on its own
app.use(bodyParser.urlencoded({ extended: true }))
//import route to the server


MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    require('./app/routes')(app,database);
    app.listen(port, () => {
        console.log("We are live on port " + port);
    })
})

//use MongoClient
