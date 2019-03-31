var express =  require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', function(request, response) {
  response.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
