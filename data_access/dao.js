var objoracle = require('oracledb');
var config = require('../config.js')

function error(err, res, connection) {
  if(err) {
    console.log(err.message);
    res.contentType('application/json').status(500);
    res.send(err.message);
    if (connection != null) close(connection, 0);
    return -1;
  } else {
    return 0;
  } 
}

function open(sql, binds, dml, res) {
  return objoracle.getConnection(
    config.database,
      function(err, connection){
      if(error(err, res, null)==-1) return;
      connection.execute(sql, binds, {autoCommit: dml}, 
          function(err, result){
            if (error(err,res,connection)==-1) return;
            res.contentType('application/json').status(200);
            res.redirect('/admin/users');
            res.status(200).json(result.rows)
            if (dml){
              res.send(JSON.stringify(result.rowsAffected))
            } else {
              res.status(200)
              //res.send(JSON.stringify(result.rows));
              res.redirect('/admin/users');
            }
            close(connection, 0);
          }
      );
    }
  )
}

function insert( sql, binds, dml, res, req ) {
  return objoracle.getConnection(
    config.database,
    function(err, connection) {
      if(err) {
        res.set('Conent-Type', 'application/json').status(500).send(JSON.stringify({
          status: 500,
          message: "Error connecting to DB",
          detailed_message: err.message
        }));
        return;
      }

      connection.execute(sql, binds, {
        isAutoCommit: dml,
        outFormat: objoracle.OBJECT //Return the result as Object
      },
      function(err, result) {
        if (err){
          // ERR
          res.set('Conent-Type', 'application/json');
          res.status(400).send(JSON.stringify({
            status: 400,
            message: err.message.indexOf("ORA-00001") > -1 ? "El usuario ya existe" : "Error de Input",
            detailed_message: err.message
          }));
        } else {
          // Successfully created the resource
          res.status(201).set('Location', '/user_profiles/').end();
        }
        close(connection, req);
      });
    }
  );
} 

function close(connection, req) {
  connection.release(
    function(err) {
      if(err) {
        console.error(err.message);
      } else {
        console.log("GET " + req.params + " : Connection released");
      }
    }
  );
}



exports.open = open;
exports.close = close;
exports.insert = insert;

