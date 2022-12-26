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



router.get('/usersLog', function (req, res, next) {
  if (req.user) {

    client.query('SELECT * FROM users WHERE id=$1', [req.user.id], function (err, result) {
      if (err) { next(err); }

      var obj = {
        user: req.user.username,
        loggedin: true
      };
      res.json(obj);

    });
  }
  else {
    res.json(false);
  }
})

router.get('/tennantList', function (req, res, next) {
  client.query('SELECT * FROM realestate INNER JOIN building ON realestate.owner_id = building.owner_id INNER JOIN tennants ON tennants.building_id = building.building_id WHERE realestate.owner_id=$1 ORDER BY tennants.rent_due_date ASC', [req.user.id], function (err, result) {
    if (err) { next(err); }
    res.json(result.rows);
  });

});

router.get('/buildingList', function (req, res, next) {
  // var min = 0;
  // var max = 0;
  // var avg = 0;
  // var num = 0;
   client.query('SELECT building.name AS bname,* FROM building INNER JOIN realestate ON realestate.owner_id = building.owner_id WHERE realestate.owner_id=$1;', [req.user.id], function (err, result) {
    if (err) { next(err); }
    res.json(result.rows);
  });
});

router.get('/tennantOut', function (req, res, next) {
  client.query('SELECT tennants.name as tennantName, * FROM tennants INNER JOIN building ON tennants.building_id = building.building_id', function (err, result) {
    if (err) { next(err); }
    res.json(result.rows);
  });
});



module.exports = router;
