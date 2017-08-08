const EXPRESS = require('express')
var router = EXPRESS.Router()

const util = require('util');
var request = require('request');
var formidable = require('formidable');
var http = require('http');

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
        var options = {
        host: 'http://localhost:3000',
        path: '/create'
        };
        options.headers.formdata = 'Custom Header Demo works';

        callback = function(response) {
            var str = ''
            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                console.log(str);
            });
        }

        var req = http.request(options, callback);
        req.end();

        // http.request('http://localhost:3000/create', function(response) {
        //     //Redirect to confirmation page
        //     response.pipe(res);
        // }).on('error', function(e) {
        //     res.sendStatus(500);
        // }).end();
    });

    //res.render('subscribe', { pagetitle: 'Post Subscribe Page', heading: 'Post Subscribe to Emails' });
});

module.exports = router;
