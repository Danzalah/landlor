require('dotenv').config();
var path = require('path');
var express = require('express');
var router = express.Router();

const Client = require('pg').Client;


const client = (() => {
  if (process.env.NODE_ENV !== 'production') {
    return new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: false
    });
  } else {
    return new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }
})();

client.connect();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/recipes', function (req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'recipes.html'));
});

router.get('/usersLog', function (req, res, next) {
  if (req.user) {
    var obj = {
      user: req.user.prefer,
      loggedin: true
    }
    res.json(obj);
    // console.log(req.user.prefer)
  }
  else {
    res.json(false);
  }
})

<<<<<<< HEAD
router.get('/recipesOut', function (req, res, next) {
=======

router.get('/recipesOut', function(req, res, next) {
>>>>>>> 5880e5c1b9c0610cb18a74ddcdf212a881a78690
  // client object enables issuing SQL queries
  client.query('SELECT * FROM recipes', function (err, result) {
    if (err) { next(err); }
    res.json(result.rows);
    // console.log(result.rows);
  });
});

router.get('/recipes', function (req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'recipes.html'));
});

module.exports = router;
