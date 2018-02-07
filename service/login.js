const EXPRESS = require('express')
var router = EXPRESS.Router()
var couchbase = require('couchbase')
var cluster = new couchbase.Cluster('http://localhost:8091/');
var bucketLogin = cluster.openBucket('MyNodeJSLogin','Sapient201@'); 
const uuidv1 = require('uuid/v1');
var N1qlQuery = couchbase.N1qlQuery;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');


var myQuery = 'Select * from MyNodeJSLogin where email=$1';
var checkExistingUserQuery = 'Select  META().id, email, password from MyNodeJSLogin where email=$1';
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
               
                console.log('updating new user data /updateUser');
                console.log('from server, row data');
                console.log(rows);
               var newUserData = {
                   firstName : req.body.name,
                   email : rows[0].email,
                   birthDate : req.body.dob,
                   country : req.body.country,
                   password : rows[0].password
                   
               }
               console.log(newUserData);
               
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
    console.log("321");
    var params = [];
    params[0] = req.body.email;
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
            if(rows.length == "0")
            {
                var respJSON = {
                    code: 401,
                    data:null
                }
                res.send(respJSON);
            }
            else
            {
                console.log(req.body.password + '--' + rows[0].MyNodeJSLogin.password)
                var passCompare = bcrypt.compareSync(req.body.password, rows[0].MyNodeJSLogin.password); 
                console.log("123"); 
                if(passCompare == true)
                {
                    console.log("passed");
                    var respJSON = {
                        code: 200,
                        data:null,
                        token : jwt.sign({ email: rows[0].MyNodeJSLogin.email, login: true}, 'RESTFULAPIs')
                    } 
                    console.log(respJSON);
                    res.send(respJSON);

                    //on load of user-profile check if loggedin yuser has webtoken
                    //every request will have webtoken with user
                }
                else{
                    var respJSON = {
                        code: 200,
                        data:null,
                        token : null 
                    }
                    
                    res.send(respJSON);
                }
                
            }
        } 
        
    });
});

module.exports = router;