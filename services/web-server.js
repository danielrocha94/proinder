const http = require('http');
const express = require('express');
const webServerConfig = require('../config.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const database = require('../services/database.js');
const router   = require('../routes/index.js')

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    var app = express();
    httpServer = http.createServer(app);

    app.use(express.static('client'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // serve static files from /public and /assets
    app.use(express.static(`${__dirname}/../public`));
    app.use(express.static(`${__dirname}/../assets`));

    app.set('view engine', 'pug');

    // set views folder
    app.set('views', `${__dirname}/../views`);

    // Combines logging info from request and response
    app.use(morgan('combined'));

    app.use('/', router);

    httpServer.listen(webServerConfig.port, err => {
      if (err) {
        reject(err);
        return;
      }

      console.log(`Web server listening on:${webServerConfig.port}`)
      resolve();
    });
  });
}

module.exports.initialize = initialize;

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;
