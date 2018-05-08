const webServer = require('./services/web-server.js');
const database = require('./services/database.js');

async function startup() {
  console.log('Starting application...');

  try {
    console.log('Initializing database module...');
    await database.initialize();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  try {
    await webServer.initialize();
  } catch(err) {
    console.error(err);

    process.exit(1); // non zero equals error
  }

}

startup();

async function shutdown(e) {
  let err = e;

  console.log('Shutting down');

  try {
    console.log('Closing web server module...');
    await webServer.close();
  } catch(e) {
    console.log('Encountered error', e);

    err = err || e;
  }

  try {
    console.log('Closing database module');

    await database.close();
  } catch (err) {
    console.log('Encountered error', e);

    err = err || e;
  }

  console.log('Exiting process');

  if (err) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}
  
process.on('SIGTERM', sigint);
process.on('SIGINT', sigint);

function sigint() {
  console.log('... Received terminate signal.');
  shutdown();
}

process.on('uncaughtException', err => {
  console.log('Uncaught exception');
  console.log(err);

  shutdown(err);
});
  
//app.use(express.static('client'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//
//// serve static files from /public
//app.use(express.static(`${__dirname}/public`));
//app.use(express.static(`${__dirname}/assets`));
//
//app.set('view engine', 'pug');
//app.set('views', `${__dirname}/views`);
//
//// routes
//const routes = require('./routes/index');
//app.use('/', routes);
//
//server.listen(3000, () => {
//  console.log('Express app listening on port 3000')
//});
