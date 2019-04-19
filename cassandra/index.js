const express = require('express')
const cassandra = require('cassandra-driver');
const bodyParser = require('body-parser')
const app = express();
const port = 3001;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: "resturants" });
client.connect(function(err, result){
  console.log('index: cassandra connected');
});

const getAllResturants = 'select * from sidebar';
const getSelectedResturant = 'select * from sidebar where id = ?'
const postResturant = 'INSERT INTO sidebar (id, address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef, catering, privateFacilities) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
const updateResturant = 'UPDATE sidebar SET address = ?, neighborhood = ?, crossStreet = ?, parking = ?, dinning = ?, cuisines = ?, hours = ?, phone = ?, website = ?, payment = ?, dress = ?, chef = ?, catering = ?, privateFacilities = ? WHERE id = ?';
const deleteResturant = 'DELETE from sidebar where id = ?'

app.get('/api/resturants', (req, res) => {
 client.execute(getAllResturants, (err, result)=>{
   if(err){
    res.status(404).send(err);
   } 
   res.status(200).json(result.rows);
 });
});

app.get('/api/resturants/:id', (req, res) => {
 client.execute(getSelectedResturant, [req.params.id], { prepare : true }, (err, result)=>{
  if(err){
   res.status(404).send(err);
  } 
  res.status(200).json(result.rows);
 });
});

app.post('/api/resturants', (req,res)=>{
 const { id, address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef, catering, privateFacilities } = req.body;
 client.execute(postResturant, [id, address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef, catering, privateFacilities], { prepare : true }, (error, results) => {
  if (error) {
    throw error
  }
  res.status(200).json('Success add a new resturant'); 
 });
});

app.put('/api/resturants/:id', (req,res)=>{
 const { id, address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef, catering, privateFacilities } = req.body;
 client.execute(updateResturant, [address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef, catering, privateFacilities, id], { prepare : true }, (error, results) => {
  if (error) {
    throw error
  }
  res.status(200).json('Successful update'); 
 });
});

app.delete('/api/resturants/:id', (req,res)=>{
 client.execute(deleteResturant, [req.params.id], { prepare : true }, (error, results) => {
  if (error) {
   throw error
  }
  res.status(200).json('Successful deleted'); 
 });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})