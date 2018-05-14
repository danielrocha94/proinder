const recolectores = require('../data_access/recolectores.js');

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
module.exports.index = index
