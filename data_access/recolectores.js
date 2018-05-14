const database = require('../services/database.js');
const oracledb = require('oracledb');

const baseQuery = 
  `select id "id",
   first_name "first_name",
   last_name "last_name",
   email "email",
   password "password",
   creation_date "creation_date"
  from client`

async function index() {
  let query = baseQuery;

  const binds = {};
  binds.recolector_role_id = 3

  query += `\nwhere role_id = :recolector_role_id`;

  const result = await database.simpleExecute(query, binds)
  return result.rows
}
module.exports.index = index;
