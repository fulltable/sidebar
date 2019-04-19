const faker = require('faker');
// const fs = require('fs');
// const fastcsv = require('fast-csv'); 
const ws = fs.createWriteStream("out.csv"); 

const populateItems = (num) => {
  const randRange = (min, max) => (Math.floor(Math.random() * (max + 1 - min)) + min);
  for (let restaurantId = 1; restaurantId <= 2000000; restaurantId += 1) {
    let newItem = {};
    newItem.restaurantId = restaurantId + num;
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

    let data = [
      {
        restaurantId: newItem.restaurantId,
        address: newItem.address,
        neighborhood: newItem.neighborhood,
        crossStreet: newItem.crossStreet,
        parking: newItem.parking,
        dining: newItem.dining,
        cuisines: newItem.cuisines,
        hours: newItem.hours,
        phone: newItem.phone,
        website: newItem.website,
        payment: newItem.payment,
        dress: newItem.dress,
        chef: newItem.chef,
        catering: newItem.catering,
        privateFacilities: newItem.privateFacilities
      }
    ]
    // return data
    console.log(newItem);
   }
}

populateItems()

function writeOneMillionTimes(writer, data, encoding, callback) {
  var i = 10;
  write();
  function write() {
    var ok = true;
    do {
      i -= 1;
      if (i === 0) {
        // last time!
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

// writeOneMillionTimes(fastcsv, populateItems());

