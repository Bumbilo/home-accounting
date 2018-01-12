const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const db = require('./db');
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(db.url, (err, db) => {
  if (err) return console.log(err);

  require('./routes')(app, db);

  app.listen(port, () => {
    console.log(`Server is work on port ${port}`);
  });

});

app.get('/', (req, res) => {
  res.send('Hello world');
});

