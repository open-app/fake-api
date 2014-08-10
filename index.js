var Person = require('oa-types/lib').Person.allOf[1];
var Group = require('oa-types/lib').Group.allOf[1];
var Membership = require('oa-types/lib').Membership;
var mock = require('json-schema-mock');
var express = require('express');
var Promise = require('bluebird');
var makeMemberships = require('./lib/makeMemberships');
var makeAgents = require('./lib/makeAgents');
var assignMemberships = require('./lib/assignMemberships');
var assignGroupMemberships = require('./lib/assignGroupMemberships')
var _ = Promise.promisifyAll(require('lodash'));


var app = express();         
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 
var router = express.Router();    

Promise.props({
  people: makeAgents(Person, 10),
  groups: makeAgents(Group, 10)
}).then(function(results) {
  return  Promise.props({
    people: results.people,
    groups: results.groups,
    memberships: makeMemberships(results.people, results.groups)
  })
}).then(function(results) {
  return Promise.props({
    people: assignMemberships(results.people, results.memberships),
    groups: results.groups,
    memberships: results.memberships
  })
}).then(function(results) {
  return Promise.props({
    people: results.people,
    groups: assignGroupMemberships(results.groups, results.memberships)
  })
}).then(function(results) {


router.get('/groups', function(req, res) {
  res.json({ '@graph': results.groups }); 
});

router.get('/people', function(req, res) {
  if (req.query.email) {
    Promise.filter(results.people, function(person) {
      return person.email === req.query.email
    }).then(function(people) {
      res.json({'@graph': people})
    })
  } else {
    res.json({'@graph': results.people})
  }
});




})






// router.get('/groups/:id', function(req, res) {
//   group = mock(Group);
//   res.json(group);
// })

// router.get('/people/:id', function(req, res) {
//   var person = mock(Person)
//   res.json(person);
// })


app.use('/', router);

app.listen(port);
console.log('Listening on port ' + port);
