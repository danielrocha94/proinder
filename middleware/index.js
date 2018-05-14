function loggedOut(req, res, next ) {
  if( req.session && req.session.user) {
    return res.redirect('/profile');
  }
  return next();
}

function requiresLogin(req, res, next){
  if (req.session && req.session.user){
    return next();
  } else {
    const err = new Error('Debes iniciar sesion');
    err.status = 401;
    req.session.flash = { error: err.message }
    return res.redirect('login')
  }
}

function requiresLoggedOut(req, res, next) {
  if (req.session && req.session.user) {
    const err = new Error('Ya has iniciado sesion anteriormente.')
    req.session.flash = { error: err.message }
    return res.redirect('profile')
  } else {
    return next();
  }
  return res
}

module.exports = {
  loggedOut,
  requiresLogin,
  requiresLoggedOut,
}
