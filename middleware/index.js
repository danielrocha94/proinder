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
    const err = new Error('You must be logged in');
    err.status = 401;
    next(err);
  }
}

module.exports = {
  loggedOut,
  requiresLogin
}
