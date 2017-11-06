const EXPRESS = require('express')
var router = EXPRESS.Router()
var couchbase = require('couchbase')
var cluster = new couchbase.Cluster('http://localhost:8091/');
var bucket = cluster.openBucket('MyNodeJS','Sapient201@'); 
//Username - Administrator, Sapient201@

//var N1qlQuery = couchbase.N1qlQuery;

//Create one more method for just to check if record exist, response will be just true false.

router.get('/validate', function (req, res, next) {
    var email = req.headers.email;    
    console.log(email);
    bucket.get(email, function (err, result) {
           if(err)
           {
                var respJSON = {
                    code: err.code,
                    data:null
                }
               
                res.send(respJSON); 
           }
           else
           {
               var respJSON = {
                    code: 200,
                    data : null
                }
               res.send(respJSON); 
           }           
        });
}); 

router.get('/get', function (req, res, next) {
    var email = req.headers.email;    
    console.log(email);
    bucket.get(email, function (err, result) {
           if(err)
           {
                var respJSON = {
                    code: err.code,
                    data:null
                }
               
                res.send(respJSON); 
           }
           else
           {
               var respJSON = {
                    code: 200,
                    data : JSON.stringify(result.value)
                }
               res.send(respJSON); 
           }           
        });
});  
 
router.post('/create', function (req, res, next) {
    
    console.log('email id received: ' + req.body.email); 
    
    bucket.upsert(req.body.email, 'data to save inside json body',
    function (err, result) {
        if(err)
        {
            var respJSON = {
                    code: err.code,
                    data:null
                }
            
            res.send(respJSON);
        }
        else
        {
            var respJSON = {
                        code: 200,
                        data : null
                    }
            res.send(respJSON); 
        }
    });

});

module.exports = router;