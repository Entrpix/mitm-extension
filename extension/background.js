const SERVER_URL = '';
const TOKEN = '';

function logServer(log) {
  fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authentication': TOKEN
    },
    body: JSON.stringify(log)
  }).catch(error => console.error('Error sending log:', error));
}

chrome.webRequest.onCompleted.addListener(
  function(details) {
    const logEntry = {
      method: details.method,
      date: new Date().toISOString(),
      url: details.url,
      statusCode: details.statusCode,
      requestId: details.requestId,
      requestBody: details.requestBody || {},
      responseHeaders: details.responseHeaders || {}
    };

    logServer(logEntry);
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders", "extraHeaders"]
);
