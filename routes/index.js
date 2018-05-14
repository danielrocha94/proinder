const express = require('express');
const router = express.Router();
const mid = require('../middleware');
const dao = require("../data_access/dao");
const clients = require('../controllers/clients.js');
const recolectores = require('../controllers/recolectores.js');

router.get('/', (req, res, next) => {
  return res.render('index');
});

router.route('/register')
  .get(mid.requiresLoggedOut, (req, res) => {
    return res.render('register', {title: 'Register'});
  })
  .post(mid.requiresLoggedOut, clients.register);

router.route('/login')
  .get(mid.requiresLoggedOut, (req, res) => {
    return res.render('login', {title: 'Login'});
  })
  .post(mid.requiresLoggedOut, clients.login);

router.route('/logout')
  .get(mid.requiresLogin, (req, res) => {
    req.session.destroy((err) => {
      res.redirect('/')
    })
  })

router.get('/blog', (req, res, next) => {
  return res.render('blog', {title: 'Blog'});
});

router.get('/contacto', (req, res, next) => {
  return res.render('contacto', {title: 'Contacto'});
});

router.get('/profile', mid.requiresLogin, (req, res, next) => {
  const { user, flash } = req.session;
  if ( !!user ) {
    var params = {title: 'Perfil', user: user}
    if (flash) {
      params = Object.assign({}, params, flash)
    }
    return res.render('profile', params);
  } else {
    return res.render('index');
  }
});

router.route('/admin/recolectores')
  .get(recolectores.index);

router.route('/admin/clientes')
  .get(clients.index)

router.get('/admin/users', (req, res, next) => {
  console.log('GET /admin')
  return res.render('admin/users', {title: 'Panel Administrador'});
});

//POST Login

router.route('/clients/:id?')
  .get(clients.get)
  .post(clients.post)
  .put(clients.put)

module.exports = router;
