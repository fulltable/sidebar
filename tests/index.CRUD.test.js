const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const urlRequest =  request('http://localhost:3000');

describe('Server get functionality', () => {
    it('Should return status of 200 when called', () => {
        urlRequest
        .get('/')
        .set('Accept', 'application/json')
        .expect(200);
    });

    it('Should respond with stringified object', () => {
        urlRequest
        .get('/')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
            expect(err).toBe(null);
            expect(JSON.parse(res.text).info).toBe("Node.js, Express, and Postgres API");
        })
    });

    it('Should respond with an id being given', () => {
        urlRequest
        .get('/api/sidebar/90')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
             expect(err).toBe(null);
             expect(JSON.parse(res.text).id).toBe(90);
        })
     });
});

// describe('Server put functionality', () => {
//     it('Should return status of 200 when called', () => {
//         urlRequest
//         .put('/')
//         .set('Accept', 'application/json')
//         .expect(200);
//     });

//     it('Should respond with user ID', () => {
//         urlRequest
//         .put('/resturants/50')
//         .send({
//             address: "San Francisco CA 50 test"
//         })
//         .expect(200)
//         .end((err, res) => {
//             expect(err).toBe(null);
//             expect(JSON.parse(res.text)).toBe(`User modified with ID: 50`);
//         })
//     });

//     it('Should update the address', () => {
//         urlRequest
//         .put('/resturants/90')
//         .send({
//             address: "San Francisco CA"
//         })
//         .expect(200)
//         .end((err, res) => {
//             expect(err).toBe(null);
//             expect(JSON.parse(res.text)).toBe(`User modified with ID: 90`);
//         })
//     });
// });
