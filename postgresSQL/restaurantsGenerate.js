const faker = require('faker');

const populateRestaturant = () => {
 const randRange = (min, max) => (Math.floor(Math.random() * (max + 1 - min)) + min);
   let newRestaurant = {};
   const minRange = Math.floor(Math.random() * 42) + 8;
   const maxRange = minRange + Math.floor(Math.random() * 10) + 5
   newRestaurant.costRange = JSON.stringify([minRange, maxRange]);
   newRestaurant.description = faker.lorem.paragraph();
   newRestaurant.name = faker.company.companyName();
   newRestaurant.rating = (Math.random() * 5).toFixed(1);
   newRestaurant.reviewCount = Math.floor(Math.random() * 2000);
   const tagCount = randRange(1, 3);
   let tags = [];
   for (let i = 0; i < tagCount; i++) {
     const newTag = faker.commerce.productAdjective();
     if (tags.indexOf(newTag) < 0) {
       tags.push(newTag);
     }
   }
   newRestaurant.tags = JSON.stringify(tags);

   newRestaurant.address = [faker.address.streetAddress(), faker.address.city(), faker.address.stateAbbr()].join(' ');
    if (randRange(0, 2) === 2) {
     newRestaurant.catering = faker.lorem.sentences();
    } else {
     newRestaurant.catering = 'N/A'
    }
    newRestaurant.chef = faker.name.findName();
    newRestaurant.crossStreet = [faker.address.streetName(), faker.address.streetName()].join(' and ');
    const cuisineCount = randRange(1, 3);
    let cuisines = [];
    for (let i = 0; i < cuisineCount; i++) {
      cuisines.push(faker.commerce.productMaterial());
    }
    newRestaurant.cuisines = cuisines.join(', ');
    newRestaurant.dining = faker.commerce.productAdjective();
    newRestaurant.dress = [faker.commerce.productAdjective(), faker.commerce.productMaterial()].join(' ');
    newRestaurant.hours = 'Monday - Friday, ' + randRange(1, 12) + ':00am - ' + randRange(1, 12) + ':00pm';
    newRestaurant.neighborhood = faker.address.citySuffix();
    newRestaurant.neighborhood = newRestaurant.neighborhood.charAt(0).toUpperCase() + newRestaurant.neighborhood.slice(1);
    newRestaurant.parking = faker.lorem.sentences();
    newRestaurant.payment = 'Visa, Discover, MasterCard';
    newRestaurant.phone = faker.phone.phoneNumber();
    if (randRange(0, 2) === 2) {
     newRestaurant.privateFacilities = faker.lorem.sentences();
    } else {
     newRestaurant.privateFacilities = 'N/A'
    }
    newRestaurant.website = faker.internet.url();

    return newRestaurant
 }

 module.exports = {
  populateRestaturant
}

