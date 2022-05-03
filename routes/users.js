var express = require('express');
var router = express.Router();

// new stuff
var path = require('path');
var env = require('dotenv').config();
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
client.connect(); //connect to database

var passport = require('passport');
var bcrypt = require('bcryptjs');

router.get('/logout', function (req, res) {
  req.logout(); //passport provide it

  // let xhttp = new XMLHttpRequest();
  // xhttp.open("GET", "/usersLog", true)
  // xhttp.send(false)


  res.redirect('/'); // Successful. redirect to localhost:3000/
});

function loggedIn(req, res, next) {
  if (req.user) {
    next(); // req.user exists, go to the next function (right after loggedIn)
  } else {
    res.redirect('/users/login'); // user doesn't exists redirect to localhost:3000/users/login
  }
}

router.get('/profile', loggedIn, function (req, res) {
  // req.user: passport middleware adds "user" object to HTTP req object
  res.sendFile(path.join(__dirname, '..', 'public', 'profile.html'));
});

router.post('/profile', function (req, res, next) {
  // console.log(req.body)
  // console.log(req.user)

  if (!req.body.title || !req.body.description || !req.body.portion || !req.body.instructions || !req.body.images ||
    !req.body.preptime || !req.body.cooktime || !req.body.servings || !req.body.ingredients) {
    res.redirect('/users/profile?name=' + req.user.username + "&message=fill+all+empty+fields");
    console.log("there are empty");
  }
  else {

    client.query('SELECT count(*) FROM recipes', [], function (err, result) {
      if (err) {
        console.log("error counting recipe")
        next(err)
      }
      var nextid = parseInt(result.rows[0].count) + 1;

      var portions = String(req.body.portion).split(',');
      portions = portions.filter(item => item);   // remove empty/false values
      var ingredients = String(req.body.ingredients).split(',');
      ingredients = ingredients.filter(item => item);
      var images = req.body.images.split(',');
      var instructions = String(req.body.instructions).split(',');
      instructions = instructions.filter(item => item);
      var totaltime = String(parseInt(req.body.cooktime) + parseInt(req.body.preptime)) + "M";
      var cooktime = req.body.cooktime + "M";
      var preptime = req.body.preptime + "M";

      const d = new Date();
      var month = d.getMonth() + 1;
      if ((d.getMonth() + 1) < 10) {
        month = "0" + (d.getMonth() + 1)
      }
      var date = d.getFullYear() + "-" + month + "-" + d.getDate();
      console.log(req.body)
      console.log(instructions)

      // TODO:: sum up cook time and prep time for total time
      client.query('INSERT INTO recipes(id, name, author, cook_time, prep_time, total_time, date_published, description, images, ing_portion, ingredients, rating, rating_count, servings, instructions) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
        [nextid, req.body.title, req.user.username, cooktime, preptime, totaltime, date, req.body.description, images, portions, ingredients, 0, 0, 0, instructions], function (err, result) {
          if (err) {
            console.log("error posting recipe")
            next(err)
          }
          console.log("insert into recipes successful for id:", nextid)

        }); // end of insert query

      client.query('UPDATE users SET recipes = array_append(recipes, $1) WHERE id=$2', [nextid, req.user.id], function(err, result) {
        if (err) {
          console.log("error updating users recipes array");
          next(err);
        };

        console.log("inserted into user id:", req.user.id, " recipe list");
      }); // end of update recipes array query

    });// end of count query
  }//end of else

  res.redirect('/users/profile?name=' + req.user.username + "&message=post+recipe+success");
});

function notLoggedIn(req, res, next) {
  if (!req.user) {
    next();
  } else {
    let user = req.user.username;
    res.redirect('/users/profile?name=' + user);
  }
}

// localhost:3000/users/login
router.get('/login', notLoggedIn, function (req, res) {
  //success is set true in sign up page
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

// localhost:3000/users/login
router.post('/login',
  // This is where authentication happens - app.js
  // authentication locally (not using passport-google, passport-twitter, passport-github...)
  passport.authenticate('local', { failureRedirect: 'login?message=Incorrect+credentials', failureFlash: true }),
  function (req, res, next) {
    let user = req.user.username;
    console.log("username: ", user);
    res.redirect('/users/profile?name=' + user); // Successful. redirect to localhost:3000/users/profile
  });


router.get('/signup', function (req, res) {
  // If logged in, go to profile page
  if (req.user) {
    let user = req.user.username;
    return res.redirect('/users/profile?name=' + user);
  }
  res.sendFile(path.join(__dirname, '..', 'public', 'signup.html'));
});

function createUser(req, res, next) {
  var salt = bcrypt.genSaltSync(10);
  var password = bcrypt.hashSync(req.body.password, salt);

  client.query('INSERT INTO users (username, password, fullname, prefer) VALUES($1, $2, $3, $4)', [req.body.username, password, req.body.fullname, req.body.prefer], function (err, result) {
    if (err) {
      console.log("unable to query INSERT");
      return next(err); // throw error to error.hbs.
    }
    console.log("User creation is successful");
    res.redirect('/users/login?message=We+created+your+account+successfully!');
  });
}

router.post('/signup', function (req, res, next) {
  client.query('SELECT * FROM users WHERE username=$1', [req.body.username], function (err, result) {
    if (err) {
      console.log("sql error ");
      next(err); // throw error to error.hbs.
    }
    else if (result.rows.length > 0) {
      console.log("user exists");
      res.redirect('/users/signup?error=User+exists');
    }
    else {
      console.log("no user with that name");
      createUser(req, res, next);
    }
  });
});
// new stuff ends here


module.exports = router;