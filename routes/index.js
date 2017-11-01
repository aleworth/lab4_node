var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');

router.get('/', function(req, res, next) {
   res.sendFile('weather.html', { root:  'public' });
});


router.get('/getcity',function(req,res,next) {
    console.log("In getcity route");

fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
  if(err) throw err;
  var cities = data.toString().split("\n");  
  var jsonresult = [];
  var myRe = new RegExp("^" + req.query.q);
  for(var i = 0; i < cities.length; i++) {
    var result = cities[i].search(myRe);
	if(result != -1) {
  	  jsonresult.push({city:cities[i]});
	}
  }
    res.status(200).json(jsonresult);
  });
});

router.get('/getword',function(req,res) {
	var owl = "https://owlbot.info/api/v1/dictionary/";
	owl+=req.query.q;
	console.log(owl);
	console.log("in getword");
	request(owl).pipe(res);
});



module.exports = router;
