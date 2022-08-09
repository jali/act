const mongoose = require('mongoose');

const connectionString = 'mongodb://vision-mongo:27017/vision';

mongoose.connect(connectionString, { useNewUrlParser: true }).catch((e) => {
  console.error('Connection error', e.message);
});

const db = mongoose.connection;

module.exports = db;