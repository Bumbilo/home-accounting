const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const db = require('./db');
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

  // Create connection
MongoClient.connect(db.url, (err, db) => {
  if (err) return console.log(err);

  // Add routes in MongoDB connect
  require('./routes')(app, db);

  // Create server and listen it
  app.listen(port, () => {
    console.log(`Server is work on port ${port}`);
  });

});


