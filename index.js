var Person = require('oa-types/lib').Person.allOf[1];
var Group = require('oa-types/lib').Group.allOf[1];
var mock = require('json-schema-mock');
var express = require('express');
var Promise = require('bluebird');

var app = express();         
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 
var router = express.Router();    

router.get('/groups', function(req, res) {
  var n = parseInt(req.query.n) || 10;
  var list = new Array(n)

  Promise.map(list, function() {
    return mock(Group);
  }).then(function(result) {
    res.json({ graph: result }); 
  });

});

router.get('/people', function(req, res) {
  var n = parseInt(req.query.n) || 10;
  var list = new Array(n)

  Promise.map(list, function() {
    return mock(Person);
  }).then(function(result) {
    res.json({ graph: result }); 
  });

});


app.use('/', router);

app.listen(port);
console.log('Listening on port ' + port);
