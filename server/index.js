const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const db = require('../postgresSQL/queries')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (request, response) => {
 response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/resturants', db.getResturants)
app.get('/resturants/:id', db.getResturantsById)
app.post('/resturants', db.createResturant)
app.put('/resturants/:id', db.updateResturant)
app.delete('/resturants/:id', db.deleteResturant)

app.listen(port, () => {
 console.log(`App running on port ${port}.`)
})