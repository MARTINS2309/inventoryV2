const pgp = require('pg-promise')()

//connection string for pg-promise
const db = pgp("postgresql://db_user:password@127.0.0.1:5432/dbname");

module.exports = db