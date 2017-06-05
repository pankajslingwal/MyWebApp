const ROUTER = require('koa-router');
var router = new ROUTER();

router.get('/add', function (ctx, next) {
    yield ctx.render("index",{
        title:"Add Page",
        name:"This is add page"
    });
});

module.exports.addRouter = router;