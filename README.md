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
