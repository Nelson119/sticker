var express = require('express');
var app = express();
var ogs = require('open-graph-scraper');
var request = require('request');
var cors = require('cors');
app.use(cors());

app.get('/', function(req, res) {
	console.log(req.query.url);
	var options = {'url': req.query.url};
	ogs(options, function (err, results) {
		console.log('err:', err); // This is returns true or false. True if there was a error. The error it self is inside the results object.
		console.log('results:', results);
		res.send(results);
	});
});

app.get('/proxy', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	console.log(req.query.u);
    request.get(req.query.u).pipe(res);
});

app.use(express.static('dist'));



app.listen(8000);