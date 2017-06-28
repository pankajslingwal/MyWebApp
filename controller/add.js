const EXPRESS = require('express')
var router = EXPRESS.Router()

router.get('/', function (req, res, next) {
    res.render('add', { pagetitle: 'Add Page', heading: 'Employee Adding System' });
});

module.exports = router;
