const cassandra = require('cassandra-driver');
const pgDB = require('../postgresSQL/queries');
const now = require("performance-now")
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: "resturants" });

client.connect(function(err, result){
  console.log('index: cassandra connected');
});

function getRandomInt(max) {
 return Math.floor(Math.random() * Math.floor(max));
}

const getSelectedSidebar = 'select * from sidebar where id = ?';
const getSelectedOverview = 'select * from overview where id = ?';

function cqlSpeedTest(method, cb){
 let totalMS = 0;
 let counter = 0;
 for(let i = 0; i < 200; i++){
  let random = getRandomInt(10000000);
   let start = now().toFixed(3);
   client.execute(method, [random], { prepare : true }, (err, result)=>{
     if(err){
       console.log(err, 'error')
     } 
     let end = now().toFixed(3);
     totalMS += (end - start);
     counter += 1;
     if(counter === 200){
      cb('Total spend of Csql time is ' + totalMS + 'milliseconds')
     }
   });
 }
}

function PGSpeedTest(cb){
 let totalMS = 0;
 let counter = 0;
  for(let i = 0; i < 200; i++){
    let random = getRandomInt(10000000);
    let start = now().toFixed(3);
     pgDB.getSidebarById(random, (result)=>{
      let end = now().toFixed(3);
      totalMS += (end - start);
      counter += 1;
      if(counter === 200){
       cb('Total spend of PG time is ' + totalMS + 'milliseconds')
      }
    });
  }
}

function PGSpeedTest(cb){
  let totalMS = 0;
  let counter = 0;
   for(let i = 0; i < 200; i++){
     let random = getRandomInt(10000000);
     let start = now().toFixed(3);
      pgDB.getOverviewById(random, (result)=>{
       let end = now().toFixed(3);
       totalMS += (end - start);
       counter += 1;
       if(counter === 200){
        cb('Total spend of PG time is ' + totalMS + 'milliseconds')
       }
     });
   }
 }
// cqlSpeedTest(getSelectedSidebar, (result)=>{
//   console.log(result)
//   cqlSpeedTest(getSelectedSidebar, (result)=>{
//     console.log(result)
//     cqlSpeedTest(getSelectedSidebar, (result)=>{
//       console.log(result)
//     });
//   });
// });

// cqlSpeedTest(getSelectedOverview, (result)=>{
//   console.log(result)
//   cqlSpeedTest(getSelectedOverview, (result)=>{
//     console.log(result)
//     cqlSpeedTest(getSelectedOverview, (result)=>{
//       console.log(result)
//       cqlDone = true;
//     });
//   });
// });

PGSpeedTest((result)=>{
  console.log(result)
  PGSpeedTest((result)=>{
    console.log(result)
    PGSpeedTest((result)=>{
      console.log(result)
    });
  });
});


