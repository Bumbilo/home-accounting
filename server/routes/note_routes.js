module.exports = (app, db) => {
  app.post('/users  ', (req, res) => {
    console.log(req.body);
    res.send('Hello');
  })
};
