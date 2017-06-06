module.exports = function (router) {
    router.get('/add', function (ctx) {
        ctx.state = { pagetitle: 'Add Employee', heading: 'Add new Employee' }
        return ctx.render("add.hbs");
    });
}