const database = require('../services/database.js');
const oracledb = require('oracledb');

const baseQuery = 
    `select id "id",
      first_name "first_name",
      last_name "last_name",
      email "email",
      password "password",
      role_id "role_id",
      creation_date "creation_date"
    from client`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.email) {
    binds.email = context.email;

    query += `\nwhere email = :email`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}
module.exports.find = find;

async function index() {
  let query = baseQuery;
  
  const result = await database.simpleExecute(query, {})
  return result.rows
}
module.exports.index = index;

const createSql = 
  `INSERT INTO client( first_name, last_name, email, password, role_id) 
  values ( :first_name, :last_name, :email, :password, :role_id)`;

async function create(emp) {
  const client = Object.assign({}, emp);

  const result = await database.simpleExecute(createSql, client);
  //client.id = result.outBinds.id[0];

  return client;
}

module.exports.create = create;

