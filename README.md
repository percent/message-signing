# percent-message-signing

usage:

```js
var sign = require('percent-message-signing');
var text = '<your message which needs signing>';
var key = '<a secret shared key>';

var signature = sign(key, text); 
```

signature will be something like this:

```
K4ik36Xc4mgTa3kQzTdXqLP9luTZnG6qEPpIvZfG7njusdbSslWpPn6duxNOdr3pLDXrK/u/RNOZkLFHPfVrjA==
```

