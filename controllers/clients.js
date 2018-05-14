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

async function index(req, res, next) {
  try {
    const index = await clients.index();

    if (index.length > 0) {
      //res.status(200).json(index);
      return res.render('admin/clientes', {clientes: index})
    } else {
      res.status(500).end();
    }
  } catch (err) {
    next(err);
  }
}
module.exports.index = index

function getClientFromRec(req) {
  let date = new Date().toJSON().slice(0,10);
  const client = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
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
        req.session.user = client[0];
        return res.redirect('/profile')
      } else {
        //res.render('login', { flash: {type: "error", message: "El email o contraseña son invalidos."} });
        const err = new Error('La contraseña no coincide');
        console.log(err);
        return next(err);
      }
    } else {
      res.status(404).end();
    }
  } catch(err) {
    next(err);
    return res.render('/login', { flash: {error: err.message } })
  }
}

module.exports.login = login;

async function register(req, res, next) {
  try {
    let client = getClientFromRec(req);
    const {email, first_name, last_name, password} = client
    if (email && first_name && last_name && password && req.body.confirmPassword && req.body.tyc ) {
      if (password !== req.body.confirmPassword) {
        const err = new Error('La contraseña no coincide');
        req.session.flash = { error: err.message }
        return next(err);
      } else {
        client = await clients.create(client)
        req.session.user = client;
        return res.redirect('profile');
      }
    }
  } catch(err) {
    req.session.flash = { error: err.message }
    return res.redirect('register');
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
