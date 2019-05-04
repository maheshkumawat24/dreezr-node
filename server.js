const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');
const proxyUrl = "https://api.deezer.com/";

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/dist'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.post('/albums', (req, res) => {
  const data = req.body;
  var newurl = proxyUrl +'/artist/' + data.artistId + '/albums';
  request(newurl).pipe(res);
});

app.post('/search', (req, res) => {
  const data = req.body;
  const newUrl = proxyUrl + '/search?q=artist:' + data.artistName;
  request(newUrl).pipe(res);
})

app.post('/track', (req, res) => {
  const data = req.body;
  var newUrl = data.trackLink;
  request(newUrl).pipe(res);
})

app.get('/', (request, response) => {
  response.render('index.html');
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
