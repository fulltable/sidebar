const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

function getRandomInt(max) {
 return Math.floor(Math.random() * Math.floor(max));
}

const pgURL = request('http://localhost:3000');
const cURL = request('http://localhost:3001');


function result(table, cb){
  let counter = 0;
  function compare (table, cb) {
    for(let i = 0; i < 300; i++){
      let random = getRandomInt(10000000);
      pgURL
        .get(`/api/${table}/${random}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          cURL
          .get(`/api/${table}/${random}`)
          .end((err, resp) => {
            if(JSON.stringify(resp.text) !== JSON.stringify(res.text)){
              cb(i)
            } else {
              cb('match');
            }
        });
      });
    }
  }
  compare(table, (result)=> {result === 'match' ? counter += 1 : cb('id :' + result + ' not match'); 
                            counter === 300 ? cb('done') : null});
}

describe('Database from PostgresSQL and Cassandra should be same', () => {
  it('Compare 300 random sidebar data from 2 dbs', () => {
      result('sidebar', ((result)=> expect((result)).toBe('done')));
    });

  it('Compare 300 random overview data from 2 dbs', () => {
    result('overview', ((result)=> expect((result)).toBe('done')));
  });
});