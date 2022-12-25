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
const { Console } = require('console');

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
router.post('/edit', loggedIn, function (req, res) {
  // req.user: passport middleware adds "user" object to HTTP req object
          client.query('UPDATE tennants SET name = $2, phoneNumber = $3, rent_due_date=$4, rent_cost=$5, payCycle=$6, roomNumber=$7 WHERE tennant_id=$1', [req.body.Id,req.body.tname, req.body.phone,req.body.due,req.body.cost,req.body.paycycle,req.body.roomnumber], function(err, result) {
            if (err) {
              console.log("error updating tennants");
              next(err);
            };

        }); // end of insert query
        res.redirect('/users/tennants?tennant_id=' + req.body.Id);
});

router.post('/deleteProfile', loggedIn, function (req, res) {
  // req.user: passport middleware adds "user" object to HTTP req object
          client.query('DELETE FROM TENNANTS WHERE tennant_id=$1', [req.body.tennantId], function(err, result) {
            if (err) {
              console.log("error deleting from tennants");
              next(err);
            };

        }); // end of insert query
        // console.log(req.user.username);
        client.query('SELECT * FROM USERS WHERE USERNAME LIKE $1',[req.user.username], function(err, result) {
          if (err) {
            console.log("error deleting from tennants");
            next(err);
          };

          // console.log(result.rows[0].id);
          client.query('SELECT COUNT(*) FROM TENNANTS INNER JOIN BUILDING ON TENNANTS.BUILDING_ID=BUILDING.BUILDING_ID WHERE BUILDING.OWNER_ID = $1',[result.rows[0].id], function(err, result) {
            if (err) {
              console.log("error deleting from tennants");
              next(err);
            };
            if(result.rows[0].count == 0 ){
              // ---------------------
              client.query('SELECT * FROM USERS WHERE USERNAME LIKE $1',[req.user.username], function(err, result) {
                if (err) {
                  console.log("error selecting from tennats");
                  next(err);
                };
                
                client.query("SELECT * FROM BUILDING WHERE OWNER_ID = $1", [result.rows[0].id], function(err, result) {
                  if (err) {
                    console.log("error updating tennants");
                    next(err);
                  };
                  // console.log(result.rows[0].building_id);
                        client.query('INSERT INTO tennants ( building_id,rent_cost,rent_due_date,name,phoneNumber,payCycle,roomNumber) VALUES($1,$2,$3,$4,$5,$6,$7)', [result.rows[0].building_id,"1000","2023-01-01","John Smith","9098765432",1,"room 2"], function (err, result) {
                          if (err) {
                            console.log("unable to query INSERT into tennants");
                            return next(err); // throw error to error.hbs.
                          }
                    }); // end of insert query
              }); // end of insert query
            }); // end of insert query
              // ---------------------
              
            }
            // console.log(result.rows[0]);
        }); // end of insert query
      }); // end of insert query
       
        res.redirect('/users/profile?name=' + req.user.username);
});

router.post('/addTennant', loggedIn, function (req, res) {
  // req.user: passport middleware adds "user" object to HTTP req object
      // console.log(req.body)
          client.query('INSERT INTO tennants (building_id, rent_cost, rent_due_date, name,phonenumber,paycycle,roomnumber) VALUES ($1,$2,$3,$4,$5,$6,$7)', [req.body.bId,req.body.cost,req.body.due,req.body.tname,req.body.phone,req.body.paycycle,req.body.roomnumber], function(err, result) {
            if (err) {
              console.log("error inserting into tennant");
              next(err);
            };
            console.log("success");
        }); // end of insert query
        res.redirect('/users/buildings?building_id=' + req.body.buildingId);
});

router.post('/addNewBuilding', loggedIn, function (req, res) {
  // req.user: passport middleware adds "user" object to HTTP req object

          client.query('INSERT INTO BUILDING (owner_id, name, numberOfUnits) VALUES ($1,$2,$3)', [req.body.ownerId,req.body.bname,req.body.units], function(err, result) {
            if (err) {
              console.log("error inserting into building");
              next(err);
            };
            console.log("success");
        }); // end of insert query
        res.redirect('/users/buildings?building_id=' + req.body.buildingId);
});

router.post('/updatePaid', loggedIn, function (req, res) {
  // req.user: passport middleware adds "user" object to HTTP req object
        // console.log(req.body);
          client.query('SELECT * FROM TENNANTS WHERE TENNANT_ID = $1', [req.body.tennantId], function(err, result) {
            if (err) {
              console.log("error selecting from tennats");
              next(err);
            };
            
            client.query("UPDATE tennants SET rent_due_date=(CAST($3 as date) + $2 * interval '1 month') WHERE tennant_id=$1", [req.body.tennantId,result.rows[0].paycycle,result.rows[0].rent_due_date], function(err, result) {
              // (CAST($3 as date) * INTERVAL concat($2,'month'))
              if (err) {
                console.log("error updating tennants");
                next(err);
              };
  
          }); // end of insert query
        }); // end of insert query
        res.redirect('/users/profile?name=' + req.user.username);
});

router.post('/updateBuilding', loggedIn, function (req, res) {
  // req.user: passport middleware adds "user" object to HTTP req object
        console.log(req.body);
          client.query('UPDATE BUILDING SET owner_id=$1, name=$2, numberOfUnits=$3 WHERE building_id=$4', [req.body.ownerId,req.body.bname,req.body.units,req.body.buildingId], function(err, result) {
            if (err) {
              console.log("error inserting into building");
              next(err);
            };
            console.log("success");
        }); // end of insert query
        res.redirect('/users/buildings?building_id=' + req.body.buildingId);
});

router.get('/tennants', loggedIn, function (req, res) {
  // req.user: passport middleware adds "user" object to HTTP req object
  res.sendFile(path.join(__dirname, '..', 'public', 'tennants.html'));
});
router.get('/buildings', loggedIn, function (req, res) {
  // req.user: passport middleware adds "user" object to HTTP req object
  res.sendFile(path.join(__dirname, '..', 'public', 'buildings.html'));
});
router.post('/profile', function (req, res, next) {

  if (!req.user) {
    res.redirect('/users/profile?name=' + req.user.username + "&message=fill+all+empty+fields");
    console.log("there are empty");
  }


  res.redirect('/users/profile?name=' + req.user.username + "&message=post+success");
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
  var num = "(999) 999-1234";

  client.query('INSERT INTO users (username, password, fullname, prefer) VALUES($1, $2, $3, $4)', [req.body.username, password, req.body.fullname, req.body.prefer], function (err, result) {
    if (err) {
      console.log("unable to query INSERT to users");
      return next(err); // throw error to error.hbs.
    }
    client.query('SELECT * FROM USERS WHERE username = $1', [req.body.username], function (err, result) {
      if (err) {
        console.log("unable to query select from users");
        return next(err); // throw error to error.hbs.
      }
      // console.log(result.rows);
      client.query('INSERT INTO realestate (owner_id, name,phoneNumber) VALUES($1,$2,$3)', [result.rows[0].id,req.body.fullname,num], function (err, result) {
        if (err) {
          console.log("unable to query INSERT into realestate");
          return next(err); // throw error to error.hbs.
        }
      });
      client.query('INSERT INTO building (owner_id,name,numberOfUnits) VALUES($1,$2,$3)', [result.rows[0].id,"Example Building",100], function (err, result) {
        if (err) {
          console.log("unable to query INSERT into building");
          return next(err); // throw error to error.hbs.
        }
      });
      client.query('SELECT * FROM building WHERE owner_id = $1',[result.rows[0].id], function (err, result) {
        if (err) {
          console.log("unable to query INSERT into building");
          return next(err); // throw error to error.hbs.
        }
        client.query('INSERT INTO tennants ( building_id,rent_cost,rent_due_date,name,phoneNumber,payCycle,roomNumber) VALUES($1,$2,$3,$4,$5,$6,$7)', [result.rows[0].building_id,"1000","2023-01-01","John Smith","9098765432",1,"room 2"], function (err, result) {
          if (err) {
            console.log("unable to query INSERT into tennants");
            return next(err); // throw error to error.hbs.
          }
        });
      });
    });
    
    
    
    console.log("User creation is successful");
    res.redirect('/users/login?message=We+created+your+account+successfully!');
  });
  
}

router.post('/signup', function (req, res, next) {
  client.query('SELECT * FROM users WHERE username=$1', [req.body.username], function (err, result) {
    if (err) {
      console.log("sql error");
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