const KOA = require('koa');
const KOAHANDELBARS = require('koa-handlebars');
const ROUTER = require('koa-router');

var myapp = new KOA();

/*Layout for koa-handlebars*/
myapp.use(KOAHANDELBARS({
    defaultLayout:"main"
}));

/*route add for homepage*/
var router = new ROUTER();
router.get('/', function (ctx, next) {
    ctx.body = 'Hello Homepage!';
  });

myapp
  .use(router.routes())
  .use(router.allowedMethods());


var addController = require("./controller/add.js");
/*route added for other page*/
myapp
  .use(addController.addRouter.routes())
  .use(addController.addRouter.allowedMethods());

myapp.listen(3000);