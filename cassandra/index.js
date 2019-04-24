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

// const getAllSidebar = 'select * from sidebar';
const getSelectedSidebar = 'select * from sidebar where id = ?'
const postSidebar = 'INSERT INTO sidebar (id, address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef, catering, privateFacilities) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
const updateSidebar = 'UPDATE sidebar SET address = ?, neighborhood = ?, crossStreet = ?, parking = ?, dinning = ?, cuisines = ?, hours = ?, phone = ?, website = ?, payment = ?, dress = ?, chef = ?, catering = ?, privateFacilities = ? WHERE id = ?';
const deleteSidebar = 'DELETE from sidebar where id = ?'

const getSelectedOverview = 'select * from overview where id = ?'
const updateSelectedOverview = 'UPDATE overview SET costrange = ?, description = ?, name = ?, rating = ?, reviewcount = ?, tags = ? WHERE id = ?'

app.get('/api/sidebar/:id', (req, res) => {
 client.execute(getSelectedSidebar, [req.params.id], { prepare : true }, (err, result)=>{
  if(err){
   res.status(404).send(err);
  } 
  res.status(200).json(result.rows[0]);
 });
});

app.post('/api/sidebar', (req,res)=>{
 const { id, address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef, catering, privateFacilities } = req.body;
 client.execute(postSidebar, [id, address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef, catering, privateFacilities], { prepare : true }, (error, results) => {
  if (error) {
    throw error
  }
  res.status(200).json('Success add a new resturant sidebar'); 
 });
});

app.put('/api/sidebar/:id', (req,res)=>{
 const { id, address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef, catering, privateFacilities } = req.body;
 client.execute(updateSidebar, [address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef, catering, privateFacilities, id], { prepare : true }, (error, results) => {
  if (error) {
    throw error
  }
  res.status(200).json('Successful update'); 
 });
});

app.delete('/api/sidebar/:id', (req,res)=>{
 client.execute(deleteSidebar, [req.params.id], { prepare : true }, (error, results) => {
  if (error) {
   throw error
  }
  res.status(200).json('Successful deleted'); 
 });
});

app.get('/api/overview/:id', (req, res) => {
  client.execute(getSelectedOverview, [req.params.id], { prepare : true }, (err, result)=>{
   if(err){
    res.status(404).send(err);
   } 
   res.status(200).json(result.rows[0]);
  });
 });

 app.put('/api/overview/:id', (req,res)=>{
  const { id, costrange, description, name, rating, reviewcount, tags } = req.body;
  client.execute(updateSelectedOverview, [costrange, description, name, rating, reviewcount, tags, id], { prepare : true }, (error, results) => {
   if (error) {
     throw error
   }
   res.status(200).json('Successful update'); 
  });
 });

 
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})