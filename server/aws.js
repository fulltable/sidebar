const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('../postgresSQL/queries')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'ec2-13-57-188-124.us-west-1.compute.amazonaws.com',
  database: 'sidebar',
  password: 'a81884855',
  port: 5432,
  agent: false
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/sidebar/:id', (req, res) => {
  db.getSidebarById(req.params.id, (data) => {
    res.status(200).json(data[0]);
  });
});

app.get('/api/overview/:id', (req, res) => {
  db.getOverviewById(req.params.id, (data) => {
    res.status(200).json(data[0]);
  });
});

app.listen(port, () => {
 console.log(`App running on port ${port}.`)
})