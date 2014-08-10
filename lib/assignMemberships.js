var Promise = require('bluebird');
var _ = require('lodash')

var assignMemberships = function (people, memberships, callback) {
  return Promise.map(people, function(person, i) {
    var newPerson = _.clone(person);
    newPerson['memberships'] = memberships[i]
    return newPerson
  }).nodeify(callback);
}

module.exports =  Promise.promisify(assignMemberships)