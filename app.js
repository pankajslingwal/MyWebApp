const KOA = require('koa');
const KOAHANDELBARS = require('koa-handlebars');
const myapp = new KOA();

myapp.use(KOAHANDELBARS({
    defaultLayout:"main"
}));


myapp.use(function *(){
    yield this.render("index",{
        title:"test page",
        name:"pankaj"
    });
});

myapp.listen(3000);