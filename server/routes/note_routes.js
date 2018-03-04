const ObjectID = require('mongodb').ObjectID;
module.exports = function (app, database) {

  // Create connect with DB
  const db = database.db('home_accounting');

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  app.get('/', (req, res) => {
    res.send('Hello world');
  });

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('users').remove(details, (err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      }
    });
  });

  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    const note = {text: req.body.body, title: req.body.title};
    db.collection('users').update(details, note, (err, result) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(note);
      }
    });
  });

  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const detail = {'_id': new ObjectID(id)};
    db.collection('users').findOne(detail, (err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(item);
      }
    })
  });


  /* REST API*/


  // Create category
  app.post('/categories', (req, res) => {
    db.collection('categories').insert(req.body, (err, result) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        console.log(result);
        res.send(result.ops[0]);
      }
    });
  });

  // Get all categories
  app.get('/categories', (req, res) => {
    db.collection('categories').find().toArray((err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  // Edit category
  app.put('/categories/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    const note = {name: req.body.name, capacity: req.body.capacity};
    db.collection('categories').update(details, note, (err, result) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(note);
      }
    });
  });

  app.get('/categories/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('categories').findOne(details, (err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(item);
      }
    })
  });

  // Create new user for regestration
  app.post('/user', (req, res) => {
    db.collection('users').insert(req.body, (err, result) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  // Get bill {currency, value}
  app.get('/bill', (req, res) => {
    db.collection('bill').findOne((err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(item);
      }
    })
  });

  // Update bill value
  app.put('/bill/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('bill').update(details, req.body, (err, result) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(req.body);
      }
    });
  });

  // Get user email
  app.get('/user/:email', (req, res) => {
    const email = req.params.email;
    const detail = {'email': email};
    db.collection('users').findOne(detail, (err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(item);
      }
    })
  });

  app.get('/events', (req, res) => {
    db.collection('events').find().toArray((err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.get('/events/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('events').findOne(details, (err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(item);
      }
    })
  });

  app.post('/events', (req, res) => {
    db.collection('events').insert(req.body, (err, result) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(result);
      }
    });
  });

};
