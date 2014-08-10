var Promise = require('bluebird');
var _ = require('lodash')

var assignGroupMemberships = function (groups, memberships, callback) {
  var flatMemberships = _.flatten(memberships);

  return Promise.map(groups, function(group) {
    var newGroup = _.clone(group);
    newGroup['memberships'] = _.filter(flatMemberships, function(membership) {
      return membership.group['@id'] === group['@id']
    })
    return newGroup
  }).nodeify(callback);
}

module.exports =  Promise.promisify(assignGroupMemberships)