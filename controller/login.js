const EXPRESS = require('express')
var router = EXPRESS.Router()
const util = require('util');
var request = require('request');
var formidable = require('formidable');
var http = require('http');
var querystring = require('querystring');

const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd',
    session: false
  },
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});



router.get('/', function (req, res, next) {
    res.render('login', { pagetitle: 'Login Page', heading: 'Login as User' });
});

router.post('/', function (req, res, next) {
    passport.authenticate('local', { failureRedirect: '/fail' }),
    function(req, res) {
        res.redirect('/loggenin');
    }
});

 
module.exports = router;