//run with admin privilages cmd console
//gyp ERR! stack Error: Can't find Python executable "python", you can set the PYTHON env variable.
// npm install --global --production windows-build-tools
// and then to install the package

// npm install --global node-gyp
//npm config set msvs_version 2013 --global

//gyp ERR! stack ERROR: Registry editing has been disabled by your administrator.



var couchbase = require('couchbase')
var cluster = new couchbase.Cluster('couchbase://localhost:8091/');
var bucket = cluster.openBucket('MyNodeJS');
var N1qlQuery = couchbase.N1qlQuery;

bucket.manager().createPrimaryIndex(function() {
  bucket.upsert('user:king_arthur', {
    'email': 'kingarthur@couchbase.com', 'interests': ['Holy Grail', 'African Swallows']
  },
  function (err, result) {
    bucket.get('user:king_arthur', function (err, result) {
      console.log('Got result: %j', result.value);
      bucket.query(
      N1qlQuery.fromString('SELECT * FROM default WHERE $1 in interests LIMIT 1'),
      ['African Swallows'],
      function (err, rows) {
        console.log("Got rows: %j", rows);
      });
    });
  });
});