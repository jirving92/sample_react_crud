var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.locals.connection.query('SELECT * from users', (err, results, fields) => {
    if (err) throw err;
    res.send(JSON.stringify(results))
  });
});

// Create a new user
router.post('/create', (req, res, next) => {
  var create_sql = "INSERT INTO users(username, fname, lname, password) VALUES ('"+req.body.username+"','"+req.body.fname+"','"+req.body.lname+"','"+req.body.password+"')";
  res.locals.connection.query(create_sql, (err, results, fields) => {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
});

// Edit a user
router.post('/edit', (req, res, next) => {
  var edit_sql = "UPDATE users SET fname = '"+req.body.fname+"', lname = '"+req.body.lname+"' WHERE id = '"+req.body.id+"'";
  res.locals.connection.query(edit_sql, (err, results, fields) => {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
});

// Delete a user
router.post('/delete', (req, res, next) => {
  var delete_sql = "DELETE from users WHERE id = '"+req.body.id+"'";
  res.locals.connection.query(delete_sql, (err, results, fields) => {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
});

module.exports = router;
