const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const now = require("performance-now")

const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const pgURL = request('http://localhost:3000');
const cURL = request('http://localhost:3001');
let pgDone = false;

function getRandomInt(max) {
 return Math.floor(Math.random() * Math.floor(max));
}

function PGserverTest(table, cb){
  let totalMS = 0;
  let counter = 0;
    for(let i = 0; i < 100; i++){
      let start = now().toFixed(3);
      let random = getRandomInt(10000000);
      pgURL
        .get(`/api/${table}/${random}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if(err) {console.log(err)}
          let end = now().toFixed(3);
          totalMS += (end - start);
          counter += 1;
          if(counter === 100){
           cb(`Total spend time for PG server table ${table}` + totalMS + 'milliseconds')
          }
    });
  }
}

function CsqlServerTest(table, cb){
  let totalMS = 0;
  let counter = 0;
    for(let i = 0; i < 100; i++){
      let start = now().toFixed(3);
      let random = getRandomInt(10000000);
      cURL
        .get(`/api/${table}/${random}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if(err) {console.log(err)}
          let end = now().toFixed(3);
          totalMS += (end - start);
          counter += 1;
          if(counter === 100){
           cb(`Total spend time for CSQL server table ${table}` + totalMS + 'milliseconds')
          }
    });
  }
}

PGserverTest('sidebar', (result)=>{
  console.log(result);
  PGserverTest('overview', (result)=>{
    console.log(result)
    CsqlServerTest('sidebar', (result)=>{
      console.log(result);
      CsqlServerTest('overview', (result)=>{
        console.log(result)
      })
    });
  })
});
