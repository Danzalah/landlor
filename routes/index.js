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
      loggedin: true,
      recipes: req.user.recipes
    }
    res.json(obj);
    // console.log(req.user.prefer)
  }
  else {
    res.json(false);
  }
})

router.get('/recipesOut', function (req, res, next) {
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
