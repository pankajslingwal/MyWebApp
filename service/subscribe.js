const EXPRESS = require('express')
var router = EXPRESS.Router()
var couchbase = require('couchbase')
var cluster = new couchbase.Cluster('http://localhost:8091/');
var bucket = cluster.openBucket('MyNodeJS','Sapient201@'); 
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
        
    bucket.insert(req.body.email, 'data to save inside json body',
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