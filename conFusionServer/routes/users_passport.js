var express = require('express');
const bodyParser = require('body-parser')
var User = require('../models/user_passport')
var router = express.Router();
var passport = require('passport')


router.use(bodyParser.json())

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});


router.post('/login', passport.authenticate('local'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, status: 'You are successfully logged in!'});
});

router.get('/logout',(req,res,next)=>{
  if(req.session){
    req.session.destroy(); //remove the session info from server side so that the session is no longer valid
    res.clearCookie('session-id') //asking client to destroy the cookie
    res.redirect('/') //redirecting user to  homepage
  } else {
    var err = new Error('User password is Incorrect');      
    err.status = 403;
    next(err);
  }
})

module.exports = router
