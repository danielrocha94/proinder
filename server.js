var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var http = require('http');
var server = http.Server(app);


app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/assets`));

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

// routes
const routes = require('./routes/index');
app.use('/', routes);

server.listen(3000, () => {
  console.log('Express app listening on port 3000')
});
