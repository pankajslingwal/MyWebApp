const EXPRESS = require('express')
var router = EXPRESS.Router()

const util = require('util');
var request = require('request');
var formidable = require('formidable');

router.get('/', function (req, res, next) {
    res.render('subscribe', { pagetitle: 'Subscribe Page', heading: 'Subscribe to Emails' });
});


router.post('/', function (req, res, next) {
    var form = new formidable.IncomingForm();

    //  form.parse(req, function(err, fields, files) { 
    //   res.writeHead(200, {'content-type': 'text/plain'});
    //   res.write('form data:\n\n');
    //   res.end(util.inspect({fields: fields, files: files}));
    // });

    //Create http request to just save data in couchbase

    form.parse(req, function(err, fields, files) { 

        
  });  

    //res.render('subscribe', { pagetitle: 'Post Subscribe Page', heading: 'Post Subscribe to Emails' });
});

module.exports = router;
