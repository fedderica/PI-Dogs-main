const express = require('express');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
const { dogs, temperaments, dog } = require('./routes/index.js');
const morgan = require('morgan');
const path = require('path');


require('./db.js');

const server = express();

server.name = 'API';

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/api/dogs', dogs);
server.use('/api/temperaments', temperaments);
server.use('/api/dog', dog);

// Send to Front if route does not match
server.use(express.static(path.join(__dirname, '../client/build')));

server.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;