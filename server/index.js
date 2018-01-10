const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

var db = null;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello world');
});


app.get('/users', (req, res, next) => {
  db.createCollection('user',{"collaction": "hello collection"}, (err, result) => {
    if(err) {
      console.log('Collaction Err ===>', err);
    }

    console.log(result)
  })
});

MongoClient.connect('mongodb://home_accounting:M4766b@ds247317.mlab.com:47317/home_accounting', (err, database) => {
  if(err) {
    console.log('ERRORSSS =>', err);
  }

  db = database;

  app.listen(3030, () => {
    console.log('Server is work !!!');
  });
});

