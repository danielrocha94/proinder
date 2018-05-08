const express = require('express');
const router = express.Router();
const mid = require('../middleware');
const dao = require("../data_access/dao");
const clients = require('../controllers/clients.js');

router.get('/', (req, res, next) => {
  return res.render('index');
});

router.route('/register')
  .get((req, res) => {
    return res.render('register', {title: 'Register'});
  })
  .post(clients.register);

router.route('/login')
  .get((req, res) => {
    return res.render('login', {title: 'Login'});
  })
  .post(clients.login);

router.get('/blog', (req, res, next) => {
  return res.render('blog', {title: 'Blog'});
});

router.get('/contacto', (req, res, next) => {
  return res.render('contacto', {title: 'Contacto'});
});

router.get('/profile', (req, res, next) => {
  return res.render('profile', {title: 'Perfil'});
});

router.get('/admin/recolectores', (req, res, next) => {
  return res.render('admin/recolectores', {title: 'Recolectores'});
});

router.get('/admin/clientes', (req, res, next) => {
  console.log('GET CLIENTS INDEX')

  function resolveDao(req, res, next) {
    return new Promise(function(resolve){
      sql = "SELECT * FROM client WHERE role_id = 2";
      dao.open(sql, [], false, res);
      setTimeout(function(){
        resolve(res);
      }, 4000)
    });
  }

  resolveDao(req, res, next).then(function(res) {
    debugger;
    return res.render('admin/clientes', { title: 'Clientes', res: res });
  });
});

router.get('/admin/users', (req, res, next) => {
  console.log('GET /admin')
  return res.render('admin/users', {title: 'Panel Administrador'});
});

router.get('/admin/clients/index', (req, res, next) => {
  console.log('GET CLIENTS INDEX')
  sql = "SELECT * FROM client WHERE role_id = 2";
  return dao.open(sql, [], false, res);
});

//POST Login

router.route('/clients/:id?')
  .get(clients.get)
  .post(clients.post)
  .put(clients.put)

module.exports = router;
