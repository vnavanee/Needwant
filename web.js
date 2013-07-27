var express = require('express');
var fs = require('fs');

var app = express.createServer();
app.use(express.logger());
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/images'));
app.use('/', function(request, response) {
var outfile = "index.html";

//var img = "plazapagehome1.png";
//var readimg = fs.readFileSync(img);
var readfile =fs.readFileSync(outfile);
var btos = readfile.toString();

response.send(btos) ;
//response.send(readimg);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});

