const EXPRESS = require('express')
var router = EXPRESS.Router()
var couchbase = require('couchbase')
var cluster = new couchbase.Cluster('http://localhost:8091/');
var bucket = cluster.openBucket('MyNodeJS'); 
//var N1qlQuery = couchbase.N1qlQuery;


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

module.exports = router;