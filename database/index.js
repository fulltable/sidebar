const mongoose = require('mongoose');

const mongoUri = 'mongodb://database/openTableSidebar';

mongoose.connect(mongoUri, { useNewUrlParser: true });

const db = mongoose.connection;

module.exports = db;
