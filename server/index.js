const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const db = require('../postgresSQL/queries')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
 res.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/resturants', (req, res) => {
 db.getResturants((data)=>{
  res.status(200).json(data);
 });
 // res.status(200).json('hello');
});

app.get('/api/resturants/:id', (req, res) => {
 db.getResturantsById(req.params.id, (data) => {
  res.status(200).json(data);
 });
});

app.post('/api/resturants', (req, res) => {
 db.createResturant(req.body, (result) => {
  res.status(200).send(result);
 });
});

app.put('/api/resturants/:id', (req, res) => {
 db.updateResturant(req, (result) => {
  res.status(200).send(result);
 });
});

app.delete('/api/resturants/:id', (req, res) => {
 db.deleteResturant(req.params.id, (result) => {
  res.status(200).send(result);
 });
});

app.listen(port, () => {
 console.log(`App running on port ${port}.`)
})