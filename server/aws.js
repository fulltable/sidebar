const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'ec2-13-57-188-124.us-west-1.compute.amazonaws.com',
  database: 'sidebar',
  password: 'a81884855',
  port: 5432,
})

const getOverviewById = (id, cb) => {
 pool.query('SELECT * FROM overview where id = $1', [id], (error, results) => {
   if (error) {
     throw error
   }
   cb(results.rows);
 })
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/overview/:id', (req, res) => {
 getOverviewById(req.params.id, (data) => {
  res.status(200).json(data[0]);
 });
});

app.listen(port, () => {
 console.log(`App running on port ${port}.`)
})