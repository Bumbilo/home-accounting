const ObjectID = require('mongodb').ObjectID;
module.exports = function (app, database) {

  // Create connect with DB
  const db = database.db('home_accounting');

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      }
    });
  });

  app.put ('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('users').update(details, note, (err, result) => {
      if (err) {
        res.send({'error':'An error has occurred'});
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

  app.post('/notes', (req, res) => {
    const note = {text: req.body.body, title: req.body.title};
    db.collection('users').insert(note, (err, result) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(result.ops[0]);
      }
    });
  });

};
