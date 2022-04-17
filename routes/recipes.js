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
  console.log(req.query);
  res.sendFile(path.join(__dirname, '..', 'public', 'recipe_profile.html'))
});


module.exports = router; // very important when adding a new route