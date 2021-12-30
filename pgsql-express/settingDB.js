const { Pool } = require('pg');
const config = require('./config');
const Connection = new Pool(config.db);

module.exports = Connection;
