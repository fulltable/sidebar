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

app.get('/api/sidebar/:id', (req, res) => {
 db.getSidebarById(req.params.id, (data) => {
  res.status(200).json(data[0]);
 });
});

app.post('/api/sidebar', (req, res) => {
 db.createSidebar(req.body, (result) => {
  res.status(200).send(result);
 });
});

app.put('/api/sidebar/:id', (req, res) => {
 db.updateSidebar(req, (result) => {
  res.status(200).send(result);
 });
});

app.delete('/api/sidebar/:id', (req, res) => {
 db.deleteSidebar(req.params.id, (result) => {
  res.status(200).send(result);
 });
});

app.get('/api/overview/:id', (req, res) => {
 db.getOverviewById(req.params.id, (data) => {
  res.status(200).json(data);
 });
});

app.post('/api/overview', (req, res) => {
 db.createOverview(req.body, (result) => {
  res.status(200).send(result);
 });
});

app.put('/api/overview/:id', (req, res) => {
 db.updateOverview(req, (result) => {
  res.status(200).send(result);
 });
});

app.delete('/api/overview/:id', (req, res) => {
 db.deleteOverview(req.params.id, (result) => {
  res.status(200).send(result);
 });
});

app.listen(port, () => {
 console.log(`App running on port ${port}.`)
})