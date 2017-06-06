const KOA = require('koa');
const VIEWS = require('koa-views');
const ROUTER = require('koa-router');

var router = new ROUTER();
var myapp = new KOA();


/*Layout for koa-views*/
myapp.use(VIEWS(__dirname + '/views', {
  map: { hbs: 'handlebars' },
  options: {
      helpers: {
        uppercase: (str) => str.toUpperCase()
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