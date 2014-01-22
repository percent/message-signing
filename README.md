# percent-message-signing

## usage

### sign text

```js
var sign = require('percent-message-signing');
var text = '<your message which needs signing>';
var key = '<a secret shared key>';

var signature = sign(key, text); 

var valid = sign(key, text, signature); // true
```

signature will be something like this:

```
K4ik36Xc4mgTa3kQzTdXqLP9luTZnG6qEPpIvZfG7njusdbSslWpPn6duxNOdr3pLDXrK/u/RNOZkLFHPfVrjA==
```

### sign js objects

```js
var sign = require('percent-message-signing');
var obj =  { abc: 'def', ghi: 123 };
var key = '<a secret shared key>';

var signature = sign(key, obj); 

var valid = sign(key, obj, signature); // true
```

