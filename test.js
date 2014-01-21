var assert = require('assert');
var crypto = require('crypto');

var sign = require('./.');

testWith(randomSmallText, 100);
testWith(randomBigText, 100);

console.log('Oll Korrect');

function testWith(textGeneratorFn, times) {
  for (var i=0; i<times; ++i) {
    var text = textGeneratorFn();
    var key = randomSmallText();

    assert.equal(
        sign(key, text),
        sign(key, text),
        'Signature should not vary');

    assert.notEqual(
        sign(key, text),
        sign(key, changeRandomly(text)),
        'Signature should hange with different text');
  }

  console.log('Tested with %s %d times.', textGeneratorFn.name, times);
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

function changeRandomly(text) {

  var times = Math.min(text.length / 2, 5);
  var result = text;

  while (times--)
    result = changeOneChar(result);

  return result;

  function changeOneChar(text) {
    var randomIdx = Math.floor(text.length * Math.random());
    var char = text.charAt(randomIdx);
    var newChar = randomChar();
    var newText = text.replace(char, newChar);
    return newText;
  }

  function randomChar() {
    var randomText = randomSmallText();
    return randomText[Math.floor(Math.random() * randomText.length)];
  }
}

