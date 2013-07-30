
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , NeedWaProvider = require('./needwant').NeedWaProvider;

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, '/public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var needWaProvider = new NeedWaProvider('localhost', 27017);

//app.get('/', routes.index);
app.get('/users', user.list);

app.get('/',function(req, res) {
needWaProvider.findAll(function(error, neewans) {
res.render('index', {
title: 'Needs and Wants',
needwants:neewans
});
});
});

app.get('/needwant/new', function(req, res) {
res.render('new_needwant', {
title: 'New NeedWant'
});
});

//save new needwant
app.post('/needwant/new', function(req, res) {
needWaProvider.save({
ntitle :req.param('ntitle'),
uname: req.param('uname'),
need : req.param('need'),
want : req.param('want')
},
function (error, docs) {
res.redirect('/')
});
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
