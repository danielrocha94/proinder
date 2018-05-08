const clients = require('../data_access/clients.js');

async function get(req, res, next) {
  try {
    const context = {};
    context.id = parseInt(req.params.id, 10);
    const rows = await clients.find(context);

    if(req.params.id) {
      if(rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(404).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;

function getClientFromRec(req) {
  let date = new Date().toJSON().slice(0,10);
  const client = {
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role_id: 2,
  };

  return client;
}

async function login(req, res, next) {
  try {
    let client = getClientFromRec(req);
    if (client.email && client.password ){
      client = await clients.find(client)
      if (!!client[0] && client[0].password === req.body.password) {
        debugger;
        return res.redirect('/profile')
      } else {
        //res.render('login', { flash: {type: "error", message: "El email o contraseña son invalidos."} });
        const err = new Error('La contraseña no coincide');
        return next(err);

      }
    } else {
      res.status(404).end();
    }
  } catch(err) {
    next(err);
  }
}

module.exports.login = login;

async function register(req, res, next) {
  try {
    let client = getClientFromRec(req);
    const {email, name, lastName, password} = client
    if (email && name && lastName && password && req.body.confirmPassword && req.body.tyc ) {
      if (password !== req.body.confirmPassword) {
        const err = new Error('La contraseña no coincide');
        return next(err);
      } else {
        client = await clients.create(client)
        //req.session.userId = client.email;
        return res.redirect('/profile');
      }
    }
  } catch(err) {
    return next(err);
  }
}

module.exports.register = register;

async function post(req, res, next) {
  try {
    let client = getClientFromRec(req);

    client = await clients.create(client);
    res.status(201).json(client);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let client = getClientFromRec(req);

    if (client !== null ) {
      res.status(200).json(client);
    } else {
      res.status(404).end();
    }
  } catch(err) {
    next(err);
  }
}

module.exports.put = put;
