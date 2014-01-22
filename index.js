var crypto = require('crypto');

module.exports = sign;

var algorithm = 'sha512';
var encoding = 'base64';

function sign(key, message, claimed) {

  var parts = [];

  if (typeof message === 'object')
    addFields(message, parts);
  else
    parts.push(message);

  var hmac = crypto.createHmac(algorithm, key);
  parts.forEach(hmac.update.bind(hmac));
  var signature = hmac.digest(encoding);

  if (claimed)
    return claimed === signature;

  return signature;
}

function addFields(obj, parts) {
  Object.keys(obj).sort().forEach(addField);

  function addField(key) {
    if (obj[key] === undefined)
      return;

    parts.push(key);
    var value = obj[key];

    if (typeof value === 'object')
      addField(value, parts);
    else
      parts.push(JSON.stringify(value));
  }
}

