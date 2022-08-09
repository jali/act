const mongoose = require('mongoose');

const connectionString = 'mongodb://auth-mongo:27017/user';

mongoose.connect(connectionString, { useNewUrlParser: true }).catch((e) => {
  console.error('Connection error', e.message);
});

const db = mongoose.connection;

module.exports = db;