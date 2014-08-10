var mock = require('json-schema-mock');
var Promise = require('bluebird');
var uuid = require('node-uuid');

var emails = [
  'simon@enspiral.com',
  'charlie@enspiral.com',
  'mikey@enspiral.com',
  'derek@enspiral.com',
  'joshua@enspiral.com',
  'gen@enspiral.com',
  'reaksmey@enspiral.com',
  'craig@enspiral.com',
  'nanz@enspiral.com',
  'jesse@enspiral.com'
]

var makeAgents = function(agentType, n, callback) {
  var list = new Array(n);
  Promise.map(list, function(item, index) {
    var agent = mock(agentType);
    agent['@id'] = uuid.v4();
    if (agentType.id = "Person") {
      agent['email'] = emails[index]
    }
    return agent;
  }).nodeify(callback)

}

module.exports = Promise.promisify(makeAgents);
