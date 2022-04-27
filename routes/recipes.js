var express = require('express');
var router = express.Router();
var path = require('path');

require('dotenv').config();

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

router.get('/recipe_profile', function (req, res, next) {

  console.log(req.user)
  console.log(req.query);
  res.sendFile(path.join(__dirname, '..', 'public', 'recipe_profile.html'))
});

router.get('/whatscooking', function (req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'whatscooking.html'));
  console.log(req.user)
});

router.post('/whatscooking', function (req, res, next) {
  client.query('SELECT * FROM recipes', [], function (err, result) {
      if (err) {
          console.log("unable to query SELECT");
          next(err);
      }

      // handle trailing or leading spaces and maybe spaces in between
      var ingredients = req.body.ingredients.split(',')

      // plurals can be a problem
      // need id, match count 
      var matches = [];
      for (const [i, row] of result.rows.entries()) {
          for (const [j, ingr] of row.ingredients.entries()) {
              var id;
              var count = 0;
              var match = false;
              var length;
              for (const [k, search_ingr] of ingredients.entries()) {
                  if (search_ingr == ingr) {
                      if (!match) {
                          id = row.id;
                          length = row.ingredients.length;
                          match = true;
                      }
                      count += 1;
                  }
              }
              if (match) {
                  var obj = {
                      id: id,
                      percent_match: Math.round(count / length * 100),
                  };
                  matches.push(obj);
                  match = false;
              }

          }
      }

      console.log(matches)

      res.sendFile(path.join(__dirname, '..', 'public', 'whatscooking.html'));
  }) // end of client query
});


module.exports = router; // very important when adding a new route