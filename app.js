const KOA = require('koa');
const VIEWS = require('koa-views');
const ROUTER = require('koa-router');
const SERVE   = require('koa-static');


var router = new ROUTER();
var myapp = new KOA(); 

/*Create publica directory for static files like css and js*/
myapp.use(SERVE(__dirname + '/public'));


/*Layout for koa-views*/
myapp.use(VIEWS(__dirname + '/views', {
  map: { hbs: 'handlebars' },
  extension: 'hbs',
  options: {
      helpers: {
        uppercase: (str) => str.toUpperCase()
      },
      partials: {
        error: './error' 
      }
    }
}));


/*Route for HomePage*/
router.get('/', function (ctx) {
  ctx.state = { pagetitle: 'HomePage', heading: 'Employee Management System' }
  return ctx.render("index.hbs");

});

/*Adding Route for Add Page*/
require("./controller/add.js")(router);

myapp
  .use(router.routes())
  .use(router.allowedMethods());

myapp.listen(3000);