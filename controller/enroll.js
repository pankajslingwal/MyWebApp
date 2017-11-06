const EXPRESS = require('express')
var router = EXPRESS.Router()

const util = require('util');
var request = require('request');
var formidable = require('formidable');
var http = require('http');
var querystring = require('querystring');

router.get('/', function (req, res, next) {
    res.render('subscribe', { pagetitle: 'Subscribe Page', heading: 'Subscribe to Emails' });
});


router.post('/', function (req, res, next) {
    var form = new formidable.IncomingForm();

    //Create http request to just save data in couchbase
    form.parse(req, function(err, fields, files) {

        var options = {
        host: 'localhost',
        port: 3000,
        path: '/create',
        method: 'POST', 
         headers: {
            'Content-Type': 'application/json'
        }
        }; 

        var req = http.request(options, function(res) {
        //console.log('Status: ' + res.statusCode);
        //console.log('Headers: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (body) {
            //redirect to success
            console.log('reidrect to success');
            res.redirect('/UserHomePage'); 
        });
        });

        req.on('error', function(e) {

        //show error on Top and enable email id text box
        });
        
        req.write(JSON.stringify(fields));
        req.end();

    });

    //res.render('subscribe', { pagetitle: 'Post Subscribe Page', heading: 'Post Subscribe to Emails' });
});

module.exports = router;
