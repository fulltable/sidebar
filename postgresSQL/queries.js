const Pool = require('pg').Pool
const pool = new Pool({
  user: 'garyguan',
  host: 'localhost',
  database: 'sidebar',
  port: 5432,
})

const getResturants = (request, response) => {
  pool.query('SELECT * FROM info ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getResturantsById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM info WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createResturant = (request, response) => {
  const { address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef } = request.body

  pool.query('INSERT INTO info (address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateResturant = (request, response) => {
  const id = parseInt(request.params.id)
  const { address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef } = request.body

  pool.query(
    'UPDATE info SET address = $1, neighborhood = $2, crossStreet = $3, parking = $4, dinning = $5, cuisines = $6, hours=$7, phone=$8, website=$9, payment=$10, dress=$11, chef=$12 WHERE id = $13',
    [address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteResturant = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM info WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getResturants,
  getResturantsById,
  createResturant,
  updateResturant,
  deleteResturant,
}
