const fs = require('fs');
const fastcsv = require('fast-csv'); 
const ws = fs.createWriteStream("out.csv"); 

const data = [  
  {
    name: 'John',
    surname: 'Snow',
    age: 26,
    gender: 'M'
  }, {
    name: 'Clair',
    surname: 'White',
    age: 33,
    gender: 'F',
  }, {
    name: 'Fancy',
    surname: 'Brown',
    age: 78,
    gender: 'F'
  }
];
 
fastcsv  
  .write(data, { headers: true })
  .pipe(ws)
  .on("finish", ()=>{console.log('done')});

// csvWriter  
//   .writeRecords(data)
//   .then(()=> console.log('The CSV file was written successfully'));
  // fastcsv
  //  .fromPath("out.csv")
  //  .on("data", function(data){
  //      console.log(data);
  //  })
  //  .on("end", function(){
  //      console.log("done");
  //  });