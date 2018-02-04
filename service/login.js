const EXPRESS = require('express')
var router = EXPRESS.Router()
var couchbase = require('couchbase')
var cluster = new couchbase.Cluster('http://localhost:8091/');
var bucketLogin = cluster.openBucket('MyNodeJSLogin','Sapient201@'); 
const uuidv1 = require('uuid/v1');
var N1qlQuery = couchbase.N1qlQuery;
var jsonWebToken = require('jsonwebtoken');
var bcrypt = require('bcrypt');


var myQuery = 'Select * from MyNodeJSLogin where email=$1';
var checkExistingUserQuery = 'Select  META().id, email from MyNodeJSLogin where email=$1';
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
               var newUserData = {
                   firstName : req.body.name,
                   email : rows[0].email,
                   birthDate : req.body.dob,
                   country : req.body.country,
                   passowrd : rows[0].password
                   
               }
               
               bucketLogin.upsert(rows[0].id, JSON.stringify(newUserData),
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


router.post('/login', function (req, res, next) {
     var params = [];
    params[0] = req.body.email;
    bucketLogin.query(query1, params, function(err, rows, meta) {
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
               //if row count is zero
               //rows[0] check if there are items in rows
               // if not then throw error as some error code for showing errror at client side as no user was found.
                //api response woudl be 401 http

               //if user was found compare password
            //if user password doesn't match again response with 401 http code

            if(req.body.password != rows[0].password)
            {
                 var respJSON = {
                    code: 401,
                    data:null
                } 
            }
            else
            {
                 ///else
            //return token 

            }

           
               var newUserData = {
                   firstName : req.body.name,
                   email : rows[0].email,
                   birthDate : req.body.dob,
                   country : req.body.country,
                   passowrd : rows[0].password
                   
               }
               
           } 
    });

    
});

module.exports = router;