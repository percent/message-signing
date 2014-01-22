var assert = require('assert');
var crypto = require('crypto');

var sign = require('./.');

testWith(randomSmallText, 100);
testWith(randomBigText, 100);
testWith(randomObject, 100);

console.log('Oll Korrect');

function testWith(messageGenFn, times) {
  for (var i=0; i<times; ++i) {
    var message = messageGenFn();
    var differentMessage = messageGenFn();
    var key = randomSmallText();

    var signature = sign(key, message);

    assert.equal(
        signature,
        sign(key, message),
        'Signature should not vary');

    assert.notEqual(
        signature,
        sign(key, differentMessage),
        'Signature should change for a different message');

    assert(sign(key, message, signature),
        'sign() should validate when given a signature');
  }

  console.log('Tested with %s %d times.', messageGenFn.name, times);
}

function randomSmallText() {
  return crypto.createHash('sha1')
    .update(Math.random().toString()).digest('base64')
    .replace(/[=+/]/g, '');
}

function randomBigText() {
  var all = [], times = 30;
  while (times--) all.push(randomSmallText());
  return all.join('');
}

function randomObject() {
  var obj = {}, times = 5;
  while (times--) obj[randomSmallText()] = randomSmallText();

  obj[randomSmallText()] = null;

  obj[randomSmallText()] = undefined;

  obj[randomSmallText()] = [randomSmallText(), randomSmallText()];

  var nested = {}; nested[randomSmallText()] = randomSmallText();
  obj[randomSmallText()] = nested;

  return obj;
}

