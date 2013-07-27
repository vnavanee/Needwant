var Db =require('mongodb').Db;
va Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var objectID = require('mongodb').ObjectID;

NeedWaProvider = function(host, port) {
this.db = new Db('node-mongo-needwants', new Server(host, port, {sage:false}, {auto_reconnect:true}, {}));
this.db.open(function(){});
};

NeedWaProvider.prototype.getCollection = function(callback) {
this.db.collection('needwants', function(error, neewan) {
if(error) callback(error);
else callback(null, neewan);
});
};

NeedWaProvider.prototype.findAll = function(callback) {
this.getCollection(function(error, neewan) {
if(error) callback(error)
else {
neewan.find().toArray(function(error,results) {
if(error) callback(error)
else callback(null, results)
});
}
});
};

NeedWaProvider.prototype.save = function(employees, callback) {
this.getCollection(function(error, neewan) {
if(error) callback(error)
else {
if(typeof(needwants.length)=="undefined")
needwants = [needwants];

for (var i=0;i<needwants.length;i++) {
needwant = needwants[i];
needwant.created_at = new Date();
}

neewan.insert(needwants, function() {
callback(null, needwants);
});
}
});
};

exports.NeedWaProvider = NeedWaProvider;

