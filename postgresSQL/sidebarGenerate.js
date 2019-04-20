const faker = require('faker');
const fs = require('fs');
const fastcsv = require('fast-csv'); 
const ws = fs.createWriteStream("sidebar.csv"); 
const createCsvWriter = require('csv-writer').createObjectCsvWriter;  

const populateItems = (num) => {
  const randRange = (min, max) => (Math.floor(Math.random() * (max + 1 - min)) + min);
  // for (let restaurantId = 1; restaurantId <= 100000; restaurantId += 1) {
    let newItem = {};
    newItem.restaurantId = num;
    newItem.address = [faker.address.streetAddress(), faker.address.city(), faker.address.stateAbbr()].join(' ');
    if (randRange(0, 2) === 2) {
      newItem.catering = faker.lorem.sentences();
    } else {
      newItem.catering = 'N/A'
    }
    newItem.chef = faker.name.findName();
    newItem.crossStreet = [faker.address.streetName(), faker.address.streetName()].join(' and ');
    const cuisineCount = randRange(1, 3);
    let cuisines = [];
    for (let i = 0; i < cuisineCount; i++) {
      cuisines.push(faker.commerce.productMaterial());
    }
    newItem.cuisines = cuisines.join(', ');
    newItem.dining = faker.commerce.productAdjective();
    newItem.dress = [faker.commerce.productAdjective(), faker.commerce.productMaterial()].join(' ');
    newItem.hours = 'Monday - Friday, ' + randRange(1, 12) + ':00am - ' + randRange(1, 12) + ':00pm';
    newItem.neighborhood = faker.address.citySuffix();
    newItem.neighborhood = newItem.neighborhood.charAt(0).toUpperCase() + newItem.neighborhood.slice(1);
    newItem.parking = faker.lorem.sentences();
    newItem.payment = 'Visa, Discover, MasterCard';
    newItem.phone = faker.phone.phoneNumber();
    if (randRange(0, 2) === 2) {
      newItem.privateFacilities = faker.lorem.sentences();
    } else {
      newItem.privateFacilities = 'N/A'
    }
    newItem.website = faker.internet.url();

    // return data
    data = [];
    for (var prop in newItem) {
      data.push(newItem[prop])
    }

    // console.log(JSON.stringify(newItem));
    return data.join('@') + '\n'
  }
// }

// populateItems();
// for(let i = 1; i <= 2000000; i += 100000){
//   setTimeout(() => {populateItems(i)}, 10000)
// }

function writeOneMillionTimes(writer, data, encoding, callback, n) {
  var i = n;
  write();
  function write() {
    var ok = true;
    do {
      i -= 1;
      if (i === 1) {
        // last time!
        writer.write(data(i), encoding, callback);
        callback('done')
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data(i), encoding);
      }
    } while (i > 1 && ok);
    if (i > 1) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

writeOneMillionTimes(ws, populateItems, 'UTF-8' ,(result)=>console.log(result), 10000001);

