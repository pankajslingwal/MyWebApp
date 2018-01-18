const EXPRESS = require('express')
var router = EXPRESS.Router()
var couchbase = require('couchbase')
var cluster = new couchbase.Cluster('http://localhost:8091/');
var bucketLogin = cluster.openBucket('MyNodeJSLogin','Sapient201@'); 
const uuidv1 = require('uuid/v1');
var N1qlQuery = couchbase.N1qlQuery;

var myQuery = 'Select * from MyNodeJSLogin';
query = N1qlQuery.fromString(myQuery);




router.get('/validate', function (req, res, next) {
    var email = req.headers.email;    
    
    bucketLogin.get(email, function (err, result) {
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

router.get('/getUser', function (req, res, next) {

    bucketLogin.query(query, function(err, rows, meta) {
        
        //console.log(rows[0].MyNodeJSLogin);
        // console.log(rows[0].MyNodeJSLogin.email);
        // console.log(rows[0].email);

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
        
        // for (row in rows) {
        //     console.log(row.MyNodeJSLogin);
        //         //console.log('Name: %s. Email: %s', myrow.email, myrow.firstName);
        // }
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