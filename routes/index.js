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

    client.query('SELECT * FROM users WHERE id=$1', [req.user.id], function (err, result) {
      if (err) { next(err); }

      var obj = {
        user: req.user.username,
        loggedin: true,
        recipes: result.rows[0].recipes
      }
      res.json(obj);

      // console.log(result.rows[0].recipes)
    });
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

router.get('/swapsOut', function (req, res, next) {
  client.query("SELECT * FROM swaps", function (err, result) {
    if (err) { next(err); }
    res.json(result.rows);
  });
});

module.exports = router;
