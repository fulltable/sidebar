const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/openTableSidebar';

mongoose.connect(mongoUri, { useNewUrlParser: true });

const db = mongoose.connection;

module.exports = db;
