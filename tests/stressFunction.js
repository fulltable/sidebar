module.exports = {
  generateRandomData
};

function generateRandomData(userContext, events, done) {
  function getRandomInt(max) {
   return Math.floor(Math.random() * Math.floor(max));
  }

  userContext.vars.resturant_id = getRandomInt(10000000) + 1;
  return done();
}
