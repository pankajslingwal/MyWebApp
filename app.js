// Declaration
const EXPRESS = require('express');
const EXPHBS  = require('express-handlebars');
const path = require('path');
var session = require('express-session');
var BODYPARSER = require("body-parser");
var COOKIEPARSER = require("cookie-parser");
const passport = require('passport');
var http = require('http');


// Instance
var myapp = new EXPRESS();  
var router = EXPRESS.Router(); 
var sess;

//Adding module to application
myapp.use(EXPRESS.static(path.join(__dirname, 'public')));
myapp.use(COOKIEPARSER());
//myapp.use(BODYPARSER.urlencoded({ extended: true }));
myapp.use(session({ secret: 'ssshhhhh', resave:false, saveUninitialized:false}));
myapp.use(passport.initialize());
myapp.use(passport.session());


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
  res.render('index', { pagetitle: 'HomePage', heading: 'Subscribe to our Emails });
}); 

router.get('/user-profile', function (req, res, next) {
  sess=req.session;
  if(sess.loggedIn != undefined && sess.loggenInMember!= undefined)
  {
    res.render('user-profile', { pagetitle: 'User Prfile', heading: 'User Profile' });
  }
  else{
    res.redirect('/login')
  }
  
}); 

router.get('/login', function (req, res, next) {
  
  res.render('login', { pagetitle: 'LogIn', heading: 'LogIN' }); 
  
});

router.get('/success', function (req, res, next) {
    sess=req.session;
    
    if(sess.validatedUser == undefined)
    {
      return res.redirect('/');
    }
    
    res.render('success', { pagetitle: 'Success Page', heading: 'Thanks for subscribing to Emails' });
});

router.post('/success', function (req, res, next) {
    sess=req.session;
    if(sess.validatedUser == undefined)
    {
      return res.redirect('/');
    }
    else
    { 
        var options = { 
          host: 'localhost',
          port: 3000,
          path: '/createUser', 
          method: 'POST', 
          headers: { 
              'Content-Type': 'application/json'
              }
          };

          var req = http.request(options, function(res1) {
        
          res1.setEncoding('utf8');
          res1.on('data', function (body) {

            var createResponse = JSON.parse(body);

            if(createResponse.code == 200)
            {
                //sess.validatedUser = fields;
                sess.loggedIn = true;
                sess.loggenInMember = sess.validatedUser;
                return res.redirect('/user-profile');
            }
            
            if(createResponse.code == 12)
            {
                return res.redirect('/entryalreadyexist'); 
            }
            else
            {
                //console.log(createResponse);
                return res.redirect('/genericmessage');
            }
            
          });
          }); 

          req.on('error', function(e) {
              return res.redirect('/error'); 
          });

          req.write(JSON.stringify(sess.validatedUser));
          req.end();
        //based on response throw error if user already exist, email id is primary key and password
        //sess.validatedUser
        //Create entry in new database using passport library
        ///Thankyou for registering and redirect user to logged in page, MY profile
        //res.render('success', { pagetitle: 'Success Page', heading: 'Thanks for subscribing to Emails' });
    }
});

var enrollRouter = require("./controller/enroll.js");
//var loginRouter = require("./controller/login.js");

myapp.use('/', router)
myapp.use('/enroll', enrollRouter)
//myapp.use('/login', loginRouter)

myapp.listen(80);