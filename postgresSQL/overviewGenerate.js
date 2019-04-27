const faker = require('faker');
const fs = require('fs');
const ws = fs.createWriteStream("overview.csv"); 

const populateOverview = (num) => {
 const randRange = (min, max) => (Math.floor(Math.random() * (max + 1 - min)) + min);
   let newOverviewItem = {};
   newOverviewItem._id = num;
   newOverviewItem.restaurantId = num;
   const minRange = Math.floor(Math.random() * 42) + 8;
   const maxRange = minRange + Math.floor(Math.random() * 10) + 5
   newOverviewItem.costRange = JSON.stringify([minRange, maxRange]);
   newOverviewItem.description = faker.lorem.paragraph();
   newOverviewItem.name = faker.company.companyName();
   newOverviewItem.rating = (Math.random() * 5).toFixed(1);
   newOverviewItem.reviewCount = Math.floor(Math.random() * 2000);
   const tagCount = randRange(1, 3);
   let tags = [];
   for (let i = 0; i < tagCount; i++) {
     const newTag = faker.commerce.productAdjective();
     if (tags.indexOf(newTag) < 0) {
       tags.push(newTag);
     }
   }
   newOverviewItem.tags = JSON.stringify(tags);

   data = [];
   for (var prop in newOverviewItem) {
     data.push(newOverviewItem[prop])
   }

   return data.join('@') + '\n'
 }

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

writeOneMillionTimes(ws, populateOverview, 'UTF-8' ,(result)=>console.log(result), 100);

