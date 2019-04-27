const express = require('express');
const bodyParser = require('body-parser');
const SidebarInfo = require('../database/SidebarInfo');
const Overview = require('../database/Overview');
const path = require('path');
const cors = require('cors');

const port = 3003;
const app = express();
const db = require('../postgresSQL/queries');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/restaurants/:id', express.static(path.join(__dirname, '/../client/dist')));

app.get('/api/restaurants/:id/info', (req, res) => {
  db.getSidebarById(req.params.id, (data) => {
   res.status(200).json(data[0]);
 });
});

app.get('/api/restaurants/:id/overview', (req, res) => {
  // Overview.getOverview(req.params.id)
  //   .then(overview => {
  //     SidebarInfo.getSidebarInfo(req.params.id)
  //       .then(info => {
  //         overview.cuisine = info.cuisines.split(',')[0];
  //         console.log(overview)
  //         res.json(overview);
  //       })
  //   })
  db.getOverviewById(req.params.id, (data) => {
    data[0].costRange = JSON.parse(data[0].costRange);
    data[0].tags = JSON.parse(data[0].tags);
    data[0].cuisine = data[0].cuisine.split(',')[0]
    res.status(200).send(data[0]);
 });
})

app.get('/api/test/:id/overview', (req, res) => {
  db.getOverviewById(req.params.id, (data) => {
    data[0].costrange = JSON.parse(data[0].costRange);
    data[0].tags = JSON.parse(data[0].tags);
    res.status(200).send(data[0]);
 });
});

const server = app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});

module.exports = app;
module.exports.server = server;