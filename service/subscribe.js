const EXPRESS = require('express')
var router = EXPRESS.Router()
var couchbase = require('couchbase')
var cluster = new couchbase.Cluster('http://localhost:8091/');
var bucket = cluster.openBucket('MyNodeJS','Sapient201@'); 
//var bucketLogin = cluster.openBucket('MyNodeJSLogin','Sapient201@'); 
//const uuidv1 = require('uuid/v1');

//Username - Administrator, Sapient201@

//var N1qlQuery = couchbase.N1qlQuery;

router.get('/validate', function (req, res, next) {
    var email = req.headers.email;    
    
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
    //console.log(req.body.email);
    //console.log(uuidv1());
    bucket.insert(req.body.email, req.body,
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