
const EXPRESS = require('express');

const path = require("path");
const BODYPARSER = require('body-parser');

var myapp = new EXPRESS(); 
myapp.use(BODYPARSER.json());
var router = EXPRESS.Router();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,email');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

//Create JSON response here for Email Validation
//Define dirrent route /EmailValidation
//Implement security
//send email in body/header params


router.get('/', function (req, res, next) {
  res.send("Invalid Method Called");
});

var subscribeServiceRoutes = require("./service/subscribe.js");


myapp.use(allowCrossDomain)

myapp.use('/', router)
myapp.use('/', subscribeServiceRoutes)
myapp.listen(3000);