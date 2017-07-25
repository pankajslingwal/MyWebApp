const EXPRESS = require('express')
var router = EXPRESS.Router()
var formidable = require('formidable');

router.get('/', function (req, res, next) {
    res.render('subscribe', { pagetitle: 'Subscribe Page', heading: 'Subscribe to Emails' });
});


router.post('/', function (req, res, next) {
    var form = new formidable.IncomingForm();
    //Create model of input data from Form

    //request service that takes body or header as JSON object
    //res.send('Username: ' + req.body);
    //Get json of post
    //create service will take this member object
    //varefy if not registered
    //send response based on that
    
     form.parse(req, function(err, fields, files) {
         Console.log(fields);
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('form data:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
    

     

    res.render('subscribe', { pagetitle: 'Post Subscribe Page', heading: 'Post Subscribe to Emails' });
});

module.exports = router;
