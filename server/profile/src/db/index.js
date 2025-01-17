const mongoose = require('mongoose');

const connectionString = 'mongodb://profile-mongo:27017/profile';

mongoose.connect(connectionString, { useNewUrlParser: true }).catch((e) => {
  console.error('Connection error', e.message);
});

const db = mongoose.connection;

module.exports = db;