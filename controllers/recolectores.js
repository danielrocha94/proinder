const recolectores = require('../data_access/recolectores.js');

function getRecolectorFromRec(req) {
  let date = new Date().toJSON().slice(0,10);
  const recolector = {
    first_name: req.body.first_name,
    last_name:  req.body.last_name,
    email:      req.body.email,
    role_id:    3,
  };
  return recolector;
}

async function index(req, res, next) {
  try {
    const index = await recolectores.index();

    if (index.length > 0) {
      return res.render('admin/recolectores', { recolectores: index })
    } else {
      res.status(500).end();
    }

  } catch(err) {
    next(err);
  }
}
module.exports.index = index;


async function create(req, res, next) {
  try {
    let recolector = getRecolectorFromRec(req);

    recolector = await recolectores.create(recolector)
    res.status(201).json(recolector);
  } catch(err) {
    next(err);
  }
}
module.exports.create = create;

async function destroy(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const success = await recolectores.delete(id);

    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch(err) {
    next(err);
  }
}
module.exports.destroy = destroy;
