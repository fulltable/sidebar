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

const getSelectedSidebar = 'select * from sidebar where id = ?'
let cqlDone = false;

function cqlSpeedTest(cb){
 let totalMS = 0;
 let counter = 0;
 for(let i = 0; i < 10; i++){
  let random = getRandomInt(10000000);
   let start = now().toFixed(3);
   client.execute(getSelectedSidebar, [random], { prepare : true }, (err, result)=>{
     if(err){
       console.log(err, 'error')
     } 
     let end = now().toFixed(3);
     totalMS += (end - start);
     counter += 1;
     if(counter === 10){
      cb('Total spend of Csql time is ' + totalMS + 'milliseconds')
     }
   });
 }
}

function PGSpeedTest(cb){
 let totalMS = 0;
 let counter = 0;
  for(let i = 0; i < 10; i++){
    let random = getRandomInt(10000000);
    let start = now().toFixed(3);
     pgDB.getSidebarById(random, (result)=>{
      let end = now().toFixed(3);
      totalMS += (end - start);
      counter += 1;
      if(counter === 10){
       cb('Total spend of PG time is ' + totalMS + 'milliseconds')
      }
    });
  }
}

for(let i = 0; i < 3; i++){
 setTimeout(()=>{cqlSpeedTest((result)=>{console.log(result)}, 500)});
 i === 2 ? cqlDone = true : null;
}

if (cqlDone === true) {
  for (let i = 0; i < 3; i++){
   setTimeout(()=>{PGSpeedTest((result)=>{console.log(result)}, 500)});
  }
}

