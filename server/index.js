const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 9000;
const LOG_FILE_PATH = 'logs.json';

app.use(bodyParser.json());

const readLogs = () => {
  if (fs.existsSync(LOG_FILE_PATH)) {
    return JSON.parse(fs.readFileSync(LOG_FILE_PATH, 'utf-8'));
  }
  return [];
};

const writeLogs = (logs) => {
  fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(logs, null, 2));
};

app.get('/logs', (req, res) => {
  const token = req.query.auth;

  if (token !== process.env.TOKEN) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const logs = readLogs();
  res.json(logs);
});

app.post('/create', (req, res) => {
  const token = req.headers['authentication'];

  if (token !== process.env.TOKEN) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const newLogEntry = req.body;
  const logs = readLogs();

  logs.push(newLogEntry);
  writeLogs(logs);

  res.status(201).json({ message: 'Log entry created' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
