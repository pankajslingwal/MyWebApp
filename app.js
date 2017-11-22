// Declaration
const EXPRESS = require('express');
const EXPHBS  = require('express-handlebars');
const path = require('path');
var session = require('express-session');
var BODYPARSER = require("body-parser");
var COOKIEPARSER = require("cookie-parser");
const passport = require('passport');


// Instance
var myapp = new EXPRESS(); 
var router = EXPRESS.Router(); 
var sess;

//Adding module to application
myapp.use(EXPRESS.static(path.join(__dirname, 'public')));
myapp.use(COOKIEPARSER());
myapp.use(BODYPARSER.urlencoded({ extended: true }));
myapp.use(session({ secret: 'ssshhhhh', resave:false, saveUninitialized:true}));
myapp.use(passport.initialize());
myapp.use(passport.session());

//https://github.com/passport/express-4.x-local-example/blob/master/server.js

var hbs = EXPHBS.create({
    defaultLayout: 'main'
  }
);  

myapp.engine('handlebars', hbs.engine);
myapp.set('view engine', 'handlebars'); 




//Routing
router.get('/', function (req, res, next) {
  sess=req.session;
  sess.validatedUser = undefined;
  res.render('index', { pagetitle: 'HomePage', heading: 'Employee Management System' });
}); 

router.get('/success', function (req, res, next) {
    sess=req.session;
    //console.log(sess.validatedUser);
    if(sess.validatedUser == undefined)
    {
      return res.redirect('/');
    }
    
    res.render('success', { pagetitle: 'Success Page', heading: 'Thanks for subscribing to Emails' });
});

router.post('/success', function (req, res, next) {
    sess=req.session;
    //console.log(sess.validatedUser);
    if(sess.validatedUser == undefined)
    {
      return res.redirect('/');
    }
    
    //Pass session + password info to server
    //Create entry in new database using passport library

    ///Thankyou for registering and redirect user to logged in page, MY profile
    //res.render('success', { pagetitle: 'Success Page', heading: 'Thanks for subscribing to Emails' });
});

var enrollRouter = require("./controller/enroll.js");
var loginRouter = require("./controller/login.js");

myapp.use('/', router)
myapp.use('/enroll', enrollRouter)
myapp.use('/login', loginRouter)

myapp.listen(80);