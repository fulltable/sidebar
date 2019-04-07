const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

const overviewSchema = new mongoose.Schema({
  restaurantId: Number,
  name: String,
  rating: Number,
  reviewCount: Number,
  costRange: Array,
  cuisine: String,
  tags: Array,
  description: String,
});

const Overview = mongoose.model('Overview', overviewSchema);

const getOverview = restaurantId => {
  return Overview.findOne({ restaurantId });
} 

exports.model = Overview;
exports.getOverview = getOverview;
