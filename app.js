
const EXPRESS = require('express');
const EXPHBS  = require('express-handlebars');
const path = require("path");
var BODYPARSER = require("body-parser");

var myapp = new EXPRESS(); 
var router = EXPRESS.Router();

myapp.use(BODYPARSER.urlencoded({ extended: true }));
myapp.use(BODYPARSER.json());

myapp.use(EXPRESS.static(path.join(__dirname, 'public')));

var hbs = EXPHBS.create({
    defaultLayout: 'main'
  }
);

myapp.engine('handlebars', hbs.engine);
myapp.set('view engine', 'handlebars');


router.get('/', function (req, res, next) {
  res.render('index', { pagetitle: 'HomePage', heading: 'Employee Management System' });
}); 

var enrollRouter = require("./controller/enroll.js");

myapp.use('/', router)
myapp.use('/enroll', enrollRouter)

myapp.listen(80);