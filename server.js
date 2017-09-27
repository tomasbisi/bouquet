var express = require('express');
var https = require('https');
var app = express();
var path = require('path');


app.get('/script.js',function(req,res){
    res.sendFile(path.join(__dirname + '/script.js'));
});

app.get('/index.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/', function(req, res) {
    res.redirect('/index.html');
});


app.listen(8080);
console.log("Listening on Port 8080");

function callApi() {
	const url = "https://data.marincounty.org/resource/mw3d-ud6d.json";
	https.get(url, res => {
	  res.setEncoding("utf8");
	  let body = "";
	  res.on("data", data => {
	    body += data;
	  });
	  res.on("end", () => {
	    body = JSON.parse(body);
	    console.log("Api Called");
	    // console.log(body);
	    body.forEach(function (e){
	    	data = {};
	    	data.department = e.department
	    	data.amount = parseInt(e.amount)  	
	    	// data.month_and_year = e.month_and_year
			data.month_and_year = new Date(e.month_and_year).getTime(),                    
	    	data_values = new Array();
	    	for (var key in data)
	    		data_values.push(data[key]);
	    	console.log(data_values);
	    });
	  });
	});

}
callApi();

