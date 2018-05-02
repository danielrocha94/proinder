const express = require('express');
const router = express.Router();
const mid = require('../middleware');
const dao = require("../data_access/dao");

router.get('/', (req, res, next) => {
  return res.render('index', {title: 'Inicio' });
});

router.get('/register', (req, res, next) => {
  return res.render('register', {title: 'Registrate'});
});

router.get('/login', (req, res, next) => {
  return res.render('login', {title: 'Inicia Sesion'});
});

router.get('/blog', (req, res, next) => {
  return res.render('blog', {title: 'Blog'});
});

router.get('/Contacto', (req, res, next) => {
  return res.render('contacto', {title: 'Contacto'});
});

//POST Login
router.post('/login', (req, res, next)=> {
  const { email, password } = req.body
  if (email && password) {
    res.redirect('/profile');
  } else {
    const err = new Error('Todos los campos son requeridos.');
    err.status = 400;
    return next(err);
  }
});

// POST Register
router.post('/register', (req, res, next) => {
  const {email, name, lastName, password, confirmPassword, tyc} = req.body
  if (email && name && lastName && password && confirmPassword && tyc ) {
    if (password !== confirmPassword) {
      const err = new Error('La contraseña no coincide');
      err.status = 400;
      return next(err);
    }

    const userData = { email, name, lastName, password, confirmPassword, tyc }

    sql = "INSERT INTO client(first_name, last_name, password, email) " +
          "VALUES(:name, :lastName, :password, :email)";

    console.log(sql);

    dao.open(sql, [name, lastName, password, email], true, res);

    res.redirect('/profile');
 
  } else {
    const err = new Error('Todos los campos son requeridos.');
    err.status = 400;
    return next(err);
  }

});


module.exports = router;
