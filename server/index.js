const express = require('express');
const bodyParser = require('body-parser');
const SidebarInfo = require('../database/SidebarInfo');
const Overview = require('../database/Overview');
const path = require('path');

const port = 3005;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/api/restaurants/:id/info', (req, res) => {
  SidebarInfo.getSidebarInfo(req.params.id)
    .then(info => {
      res.send(info);
    });
});

app.get('/api/restaurants/:id/overview', (req, res) => {
  Overview.getOverview(req.params.id)
    .then(overview => {
      res.send(overview);
    })
})

const server = app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});

module.exports = app;
module.exports.server = server;