const Pool = require('pg').Pool
const pool = new Pool({
  user: 'garyguan',
  host: 'localhost',
  database: 'sidebar',
  port: 5432,
})
const createTable = (cb) => {
  pool.query(
  'CREATE TABLE IF NOT EXISTS info (ID SERIAL PRIMARY KEY, address VARCHAR(1200), neighborhood VARCHAR(145), crossStreet VARCHAR(160), parking VARCHAR(480), dinning VARCHAR(150), cuisines VARCHAR(40), hours VARCHAR(40), phone VARCHAR(40), website VARCHAR(40), payment VARCHAR(40), dress VARCHAR(40), chef VARCHAR(40), catering VARCHAR(380), privateFacilities VARCHAR(380))',
  (error, results) => {
    if (error) {
      throw error
    }
    cb('create a table info')
  })
}

const getResturants = (cb) => {
  pool.query('SELECT * FROM info ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    cb(results.rows);
  })
}

const getResturantsById = (id, cb) => {
  pool.query('SELECT * FROM info WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    cb(results.rows);
  })
}

const createResturant = (req, cb) => {
  const { address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef, catering, privateFacilities } = req

  pool.query('INSERT INTO info (address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef, catering, privateFacilities) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', [address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef, catering, privateFacilities], (error, results) => {
    if (error) {
      throw error
    }
    cb('success');
  })
}

const updateResturant = (req, cb) => {
  const id = parseInt(req.params.id)
  const { address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef, catering, privateFacilities } = req

  pool.query(
    'UPDATE info SET address = $1, neighborhood = $2, crossStreet = $3, parking = $4, dinning = $5, cuisines = $6, hours=$7, phone=$8, website=$9, payment=$10, dress=$11, chef=$12, catering=$13, privateFacilities=$14 WHERE id = $15',
    [address, neighborhood, crossStreet, parking, dinning, cuisines, hours, phone, website, payment, dress, chef, catering, privateFacilities, id],
    (error, results) => {
      if (error) {
        throw error
      }
      cb(`User modified with ID: ${id}`)
    }
  )
}

const deleteResturant = (id, cb) => {
  pool.query('DELETE FROM info WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    cb(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  createTable,
  getResturants,
  getResturantsById,
  createResturant,
  updateResturant,
  deleteResturant,
}
