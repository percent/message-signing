var crypto = require('crypto');

module.exports = sign;

var algorithm = 'sha512';
var encoding = 'base64';

function sign(key, text) {
  var hmac = crypto.createHmac(algorithm, key);
  hmac.update(text);
  var signature = hmac.digest(encoding);
  return signature;
}

