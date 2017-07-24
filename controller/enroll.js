const EXPRESS = require('express')
var router = EXPRESS.Router()

router.get('/', function (req, res, next) {
    res.render('subscribe', { pagetitle: 'Subscribe Page', heading: 'Subscribe to Emails' });
});


router.post('/', function (req, res, next) {
    //Create model of input data from Form

    //request service that takes body or header as JSON object
    res.send('Username: ' + req.body);

    //Or use formidable to get all form object

    //try to build this form from react JS
    ///Validate form here


    // if ok send data directly to couchbase to save


    res.render('subscribe', { pagetitle: 'Post Subscribe Page', heading: 'Post Subscribe to Emails' });
});

module.exports = router;
