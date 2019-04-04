const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

const sidebarInfoSchema = new mongoose.Schema({
  restaurantId: Number,
  address: String,
  neighborhood: String,
  crossStreet: String,
  parking: String,
  dining: String,
  cuisines: String,
  hours: String,
  phone: String,
  website: String,
  payment: String,
  dress: String,
  additional: String,
  chef: String,
  catering: String,
  privateFacilities: String,
});

const SidebarInfo = mongoose.model('SidebarInfo', sidebarInfoSchema);



exports.model = SidebarInfo;
