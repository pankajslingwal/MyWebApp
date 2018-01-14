const EXPRESS = require('express')
var router = EXPRESS.Router()
const util = require('util');
var request = require('request');
var formidable = require('formidable');
var http = require('http');
var querystring = require('querystring');

var sess;


//Load subscribe for after validation from homepage
router.get('/', function (req, res, next) {
    sess=req.session;
    res.render('subscribe', { pagetitle: 'Subscribe Page', heading: 'Subscribe to Emails' });
});



//User post back of form with data, redirect to appropriate page
router.post('/', function (req, res, next) {
    sess=req.session;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(err);
        
        var options = { 
        host: 'localhost',
        port: 3000,
        path: '/create', 
        method: 'POST', 
         headers: { 
            'Content-Type': 'application/json'
            }
        };

        var req = http.request(options, function(res1) {
        
        res1.setEncoding('utf8');
        res1.on('data', function (body) {

            var createResponse = JSON.parse(body);

            if(createResponse.code == 200)
            {
                sess.validatedUser = fields;
                console.log('fields set in session' + sess.validatedUser);
                return res.redirect('/success');
            }
            
            if(createResponse.code == 12)
            {
                return res.redirect('/entryalreadyexist'); 
            }
            else
            {
                //console.log(createResponse);
                return res.redirect('/genericmessage');
            }
            
        });
        }); 

        req.on('error', function(e) {
            return res.redirect('/error'); 
        });

        
        
        req.write(JSON.stringify(fields));
        req.end();

    });

});


module.exports = router;
