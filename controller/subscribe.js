const EXPRESS = require('express')
var router = EXPRESS.Router()

router.get('/', function (req, res, next) {
    res.render('subscribe', { pagetitle: 'Subscribe Page', heading: 'Subscribe to Emails' });
});

module.exports = router;
