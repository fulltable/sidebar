const db = require('./queries.js');

deleteTest = () => {
 for(let i = 1; i < 40; i++){
  db.deleteResturant(i, (result)=>{
   console.log(result);
  })
 }
}

deleteTest();