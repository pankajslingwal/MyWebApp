const EXPRESS = require('express');
const EXPHBS  = require('express-handlebars');
const path = require('path');
var session = require('express-session');
var BODYPARSER = require("body-parser");
var COOKIEPARSER = require("cookie-parser");
const passport = require('passport');
var http = require('http');
var formidable = require('formidable');
var enCryptPass = require('bcrypt');
var jwt = require('jsonwebtoken');


var myapp = new EXPRESS();  
var router = EXPRESS.Router(); 
var router1 = EXPRESS.Router(); 
var sess;

myapp.use(EXPRESS.static(path.join(__dirname, 'public')));
myapp.use(COOKIEPARSER());
//myapp.use(BODYPARSER.urlencoded({ extended: true }));
// myapp.use(BODYPARSER.json({ type: 'application/*+json' }))
// myapp.use(BODYPARSER.json());
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
  res.render('index', { pagetitle: 'HomePage', heading: 'Subscribe to our Emails '});
}); 

router.get('/logout', function (req, res, next) {
  sess=req.session;
  sess.loggenInToken = undefined;
  res.render('index', { pagetitle: 'HomePage', heading: 'Subscribe to our Emails '});
});

var enrollRouter = require("./controller/enroll.js");

myapp.use('/', router)
myapp.use('/enroll', enrollRouter)


router.get('/login', function (req, res, next) {
    sess=req.session;  
  res.render('login', { pagetitle: 'LogIn', heading: 'LogIN' }); 
  
});

router.post('/login', function (req, res, next) {
    sess=req.session;
     sess=req.session;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

      var options = { 
            host: 'localhost',
            port: 3000,
            path: '/login', 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json'
                }
            };

            

            var loginUserData = {
                   email : fields.email,
                   pwd : fields.password
               }

               
             var req = http.request(options, function(res1) {
            res1.setEncoding('utf8');
           
                

            res1.on('data', function (chunk) {

                 
                var createResponse = JSON.parse(chunk);
               
                sess.loggenInToken = createResponse.token;
                sess.loggenInMember = { email : loginUserData.email}

                
                if(createResponse.code == 200)
                {
                    return res.redirect('/user-profile');
                }
                
                if(createResponse.code == 12)
                {
                    //return res2.redirect('/entryalreadyexist'); 
                }
                else
                {
                    //return res2.redirect('/genericmessage');
                }
            });
             
            //sess.loggenInToken = createResponse.token;
            
          }); 

         

          req.on('error', function(e) {
              //return res2.redirect('/error'); 
          });
          req.write(JSON.stringify(loginUserData));
          req.end();


    });
  
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
      createUserAccount(req, res);
    }
});

function createUserAccount(req1, res2) {
  
    var options = { 
            host: 'localhost',
            port: 3000,
            path: '/createUser', 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json'
                }
            };

            var form = new formidable.IncomingForm();
            
            form.parse(req1, function(err, fields, files) {
              var subscribedUserData = sess.validatedUser;
              var User =  {
                firstName : subscribedUserData.firstName,
                email : subscribedUserData.email,
                country : subscribedUserData.country,
                pwd : enCryptPass.hashSync(fields.password, 10),
                birthDate : subscribedUserData.birthDate
              }
              
          var req = http.request(options, function(res1) {
            res1.setEncoding('utf8');
            res1.on('data', function (body) {
                var createResponse = JSON.parse(body);
                if(createResponse.code == 200)
                {
                    sess.loggenInMember = sess.validatedUser;
                    return res2.redirect('/user-profile');
                }
                
                if(createResponse.code == 12)
                {
                    return res2.redirect('/entryalreadyexist'); 
                }
                else
                {
                    return res2.redirect('/genericmessage');
                }
            });
          }); 

          req.on('error', function(e) {
              return res2.redirect('/error'); 
          });
          req.write(JSON.stringify(User));
          req.end();
              
            });            
}


myapp.use(function(req, res, next) {

 sess=req.session;
  
  var token = sess.loggenInToken;

  // decode token
  if (token) {  

    // verifies secret and checks exp
    jwt.verify(token, 'RESTFULAPIs', function(err, decoded) {      
      if (err) {
        res.redirect('/failedtoAuthenticatetoken1')
      } else {
          if(decoded.login == true)
          {
                //we can validated if token email is same as of profile email requested so that token is not used to 
                //see other user details
          }
          else
          {
              res.redirect("/loginfailed");
          }
         // console.log(decoded);
        // if everything is good, save to request for use in other routes
        //req.decoded = decoded;    
        //res.redirect('/tokenverified1')
        next();
      }
    });

  }
  else{
        //Return error as reidrect user to login pagetitle
        res.redirect('/login')
  }
});
 
myapp.use('/', router1)


router1.get('/user-profile', function (req, res, next) {
      sess=req.session;
    res.render('user-profile', { pagetitle: 'User Prfile', heading: 'User Profile', username : sess.loggenInMember.email });

}); 






myapp.listen(80);