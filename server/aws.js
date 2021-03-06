const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('../postgresSQL/queries')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Cool! You connect to AWS EC2')
})

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