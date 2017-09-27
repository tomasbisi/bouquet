var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
// const jsdom = require("jsdom");
// var totalData;


app.get('/script.js',function(req,res){
    res.sendFile(path.join(__dirname + '/script.js'));
});

app.get('/index.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/', function(req, res) {
    res.redirect('/index.html');
});


// app.get('/user', function(req, res, next) {
//   res.json(totalData);
// });


app.listen(8080);
console.log("Listening on Port 8080");
