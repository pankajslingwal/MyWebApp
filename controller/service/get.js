const EXPRESS = require('express')
var router = EXPRESS.Router()
var couchbase = require('couchbase')
var cluster = new couchbase.Cluster('http://localhost:8091/');
var bucket = cluster.openBucket('MyNodeJS'); 
//var N1qlQuery = couchbase.N1qlQuery;


router.get('/get', function (req, res, next) {
    bucket.get('test@test.com', function (err, result) {
           res.send(JSON.stringify(result.value)); 
        });
});  

module.exports = router;