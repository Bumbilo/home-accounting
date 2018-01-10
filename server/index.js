const express     = require('express');
const bodyParser  = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const db          = require('./db');
const app         = express();
const port = 3040;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });

  app.listen(port, () => {
    console.log(`Server is work on port ${port}`);
  });

});



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

app.listen(port, () => {
  console.log(`Server is work on port ${port}`);
});

// MongoClient.connect('mongodb://home_accounting:M4766b@ds247317.mlab.com:47317/home_accounting', (err, database) => {
//   if(err) {
//     console.log('ERRORSSS =>', err);
//   }
//
//   db = database;
//
// });

