const EXPRESS = require('express')
var router = EXPRESS.Router()
var couchbase = require('couchbase')
var cluster = new couchbase.Cluster('http://localhost:8091/');
var bucketLogin = cluster.openBucket('MyNodeJSLogin','Sapient201@'); 
const uuidv1 = require('uuid/v1');
var N1qlQuery = couchbase.N1qlQuery;

var myQuery = 'Select * from MyNodeJSLogin where email=$1';
var checkExistingUserQuery = 'Select  META().id from MyNodeJSLogin where email=$1';
var updateAccount = 'update * from MyNodeJSLogin where email=$1';
query = N1qlQuery.fromString(myQuery);
query1 = N1qlQuery.fromString(checkExistingUserQuery);
query2 = N1qlQuery.fromString(updateAccount);

 

router.get('/getUser/:emailId', function (req, res, next) {

    var params = [];
    params[0] = req.params.emailId;
    
    bucketLogin.query(query, params, function(err, rows, meta) {
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
                    data : JSON.stringify(rows[0].MyNodeJSLogin)
                }
               res.send(respJSON); 
           }  
    }); 
});

router.post('/updateUser', function (req, res, next) {
    
    var params = [];
    params[0] = req.body.email;
    bucketLogin.query(query1, params, function(err, rows, meta) {
        if(err)
           {
               console.log('1111');
                var respJSON = {
                    code: err.code,
                    data:null
                } 
               
                res.send(respJSON); 
           }
           else
           {
               req.body.email
               req.body.dob
               req.body.country
               //don't accept email from client side....just use meial for indetifying record in above query 
               bucketLogin.upsert(rows[0].id, '{}',
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
           }  
    });
});

router.post('/createUser', function (req, res, next) {
    bucketLogin.insert(uuidv1().toString(), req.body,
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