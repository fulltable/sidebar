const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

function getRandomInt(max) {
 return Math.floor(Math.random() * Math.floor(max));
}

const pgURL =  request('http://localhost:3000');
const cURL =  request('http://localhost:3001');

describe('Database from PostgresSQL and Cassandra should be same', () => {
 it('Compare 100 random data from two dbs', () => {
  for(let i = 0; i < 100; i++){
   let random = getRandomInt(10000000);
   pgURL
    .get(`/api/sidebar/${random}`)
    .set('Accept', 'application/json')
    .expect(200)
    .end((err, res) => {
      cURL
      .get(`/api/sidebar/${random}`)
      .end((err, response) => {
      expect((response.text)).toBe(res.text);
      });
    });
   }
  });
});