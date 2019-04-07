const SidebarInfo = require('./SidebarInfo');
const faker = require('faker');
const db = require('./index.js');

const sampleItems = [];

const populateItems = () => {
  const randRange = (min, max) => (Math.floor(Math.random() * (max + 1 - min)) + min);
  for (let restaurantId = 1; restaurantId <= 100; restaurantId += 1) {
    let newItem = {};

    newItem.restaurantId = restaurantId;
    newItem.address = [faker.address.streetAddress(), faker.address.city(), faker.address.stateAbbr()].join(' ');
    newItem.neighborhood = faker.address.citySuffix();
    newItem.neighborhood = newItem.neighborhood.charAt(0).toUpperCase() + newItem.neighborhood.slice(1);
    newItem.crossStreet = [faker.address.streetName(), faker.address.streetName()].join(' and ');
    newItem.parking = faker.lorem.sentences();
    newItem.dining = faker.commerce.productAdjective();

    const cuisineCount = randRange(1, 3);
    let cuisines = [];
    for (let i = 0; i < cuisineCount; i++) {
      cuisines.push(faker.commerce.productMaterial());
    }
    newItem.cuisines = cuisines.join(', ');
    newItem.hours = 'Monday - Friday, ' + randRange(1, 12) + ':00am - ' + randRange(1, 12) + ':00pm';
    newItem.phone = faker.phone.phoneNumber();
    newItem.website = faker.internet.url();
    newItem.payment = 'Visa, Discover, MasterCard';
    newItem.dress = [faker.commerce.productAdjective(), faker.commerce.productMaterial()].join(' ');
    newItem.chef = faker.name.findName();

    if (randRange(0, 2) === 2) {
      newItem.catering = faker.lorem.sentences();
    }
    if (randRange(0, 2) === 2) {
      newItem.privateFacilities = faker.lorem.sentences();
    }

    sampleItems.push(newItem);
  }
}

populateItems();

const insertSampleItems = () => {
  SidebarInfo.model.create(sampleItems)
    .then(() => db.close());
};

insertSampleItems();
