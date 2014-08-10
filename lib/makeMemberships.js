var _ = require('lodash');
var Promise = require('bluebird');
var uuid = require('node-uuid');
var fakeDate = (new Date()).toJSON();

var role = function() {
  if (Math.random() > 0.7) {
    return 'admin'
  } else {
    return 'member'
  }
};

var stubMembership = {
  label: 'Membership',
  startDate: fakeDate,
  endDate: fakeDate
};

var makeMemberships = function(people, groups, callback) {
  return Promise.map(people, function(person) {
    var groupSelection = _.shuffle(groups).slice(0, person.memberships.length);
    return Promise.map(groupSelection, function(group) {
      var membership = _.clone(stubMembership);
      membership['member'] = {'@id': person['@id']};
      membership['group'] = {'@id': group['@id']};
      membership['role'] = role();
      return membership;
    })
  }).nodeify(callback);
}

module.exports = Promise.promisify(makeMemberships);