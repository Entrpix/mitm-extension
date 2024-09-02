const SERVER_URL = 'http://example.com/create';
const SERVER_DOMAIN = 'example.com';
const TOKEN = '';

const LOG = ["*"];
const DONT_LOG = ["*"];

function shouldLog(url) {
  if (DONT_LOG.includes("*")) {
    return LOG.some(allowed => url.includes(allowed));
  }
  
  if (LOG.includes("*")) {
    return !DONT_LOG.some(exclude => url.includes(exclude));
  }
  
  return LOG.some(allowed => url.includes(allowed)) && !DONT_LOG.some(exclude => url.includes(exclude));
}

function sendLogToServer (log) {
  fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authentication': TOKEN
    },
    body: JSON.stringify(log)
  }).catch(error => console.error('Error sending log:', error));
}

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url.includes(SERVER_DOMAIN) || !shouldLog(details.url)) {
      return;
    }

    let requestBody = null;
    
    if (details.requestBody && details.requestBody.raw) {
      requestBody = String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes));
    }

    const logEntry = {
      method: details.method,
      date: new Date().toISOString(),
      url: details.url,
      requestBody: requestBody
    };

    sendLogToServer(logEntry);
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);

chrome.webRequest.onCompleted.addListener(
  function (details) {
    if (details.url.includes(SERVER_DOMAIN) || !shouldLog(details.url)) {
      return;
    }

    const logEntry = {
      method: details.method,
      date: new Date().toISOString(),
      url: details.url,
      requestBody: details.requestBody && details.requestBody.raw ? String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes)) : null,
      statusCode: details.statusCode,
      requestId: details.requestId,
      responseHeaders: details.responseHeaders || {}
    };

    sendLogToServer(logEntry);
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);
