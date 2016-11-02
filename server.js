var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var fs = require('fs');
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/get/list', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var list = require('./list.json');
  res.send({list: list});
});

app.get('/get/item', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var params = req.query;
  var list = require('./list.json');
  var foundItem = list.find(function(item) { return item.id === params.id;}) || {};
  res.send({item: foundItem});
});

app.get('/update/item', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var updatedItem = req.query.updatedItem;
  var list = require('./list.json');

  var indexForUpdate = list.findIndex(function(el) {return el.id === updatedItem.id;})

  if(indexForUpdate !== -1) {
    list[indexForUpdate] = updatedItem;
  } else {
    updatedItem.id = shortid.generate();
    list.push(updatedItem);
  }

  fs.writeFile('./list.json', JSON.stringify(list), function (err) {
    if(err) {
      res.send('error');
    } else {
      res.send('ok');
    }
  });
});

app.listen(port, ip, function () {
  console.log('Server is started on port '+port);
});
