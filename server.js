var express = require('express'),
  mongoskin = require('mongoskin'),
  bodyParser = require('body-parser'),
  path = require('path'),
  logger = require('morgan'),
  multer = require('multer'),
  errorHandler = require('errorhandler');

var app = express();

var db = mongoskin.db('mongodb://br1anchen:12345678@lennon.mongohq.com:10017/app29288482', {safe:true});

app.set('port', process.env.PORT || 5000);
app.use(logger('dev'));
app.use(bodyParser());
app.use(multer());
app.use(express.static(path.join(__dirname, 'dist')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.param('collectionName', function(req, res, next, collectionName){
  req.collection = db.collection(collectionName)
  return next()
});

app.get('/', function(req, res) {
  res.send('index.html');
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
