
const EXPRESS = require('express');

const path = require("path");

var myapp = new EXPRESS(); 
var router = EXPRESS.Router();


//Create JSON response here for Email Validation
//Define dirrent route /EmailValidation
//Implement security
//send email in body/header params
router.get('/', function (req, res, next) {
  res.send('Hello World');
});

myapp.use('/', router)

myapp.listen(3000);