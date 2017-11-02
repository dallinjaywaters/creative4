var express = require('express');
var request = require('request');
var fs = require('fs');
const https = require('https');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('recipe.html', {root: 'public'});
});

router.get('/getcity', function(req, res, next) {
  fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
    if(err) throw err;
    var jsonresult = [];
    var cities = data.toString().split('\n');
    var searchStr = req.query.q;
    if (searchStr)
      var myRe = new RegExp("^" + req.query.q);
    else
      var myRe = new RegExp("^");
    for(var i = 0; i < cities.length; i++) {
      var result = cities[i].search(myRe);
      if (result != -1)
      {
	//console.log(cities[i]);
	jsonresult.push({city:cities[i]})
      }
    }
    res.status(200).json(jsonresult);
  }); 
})

router.get('/getword', function(req, res, next) {
  var myword = "https://owlbot.info/api/v1/dictionary/";
  myword += req.query.q;
  console.log("in getword");
  request(myword).pipe(res);
})

router.get('/getrecipe', function(req, res, next) {
  var myrecipe = "http://food2fork.com/api/search?key=7885cf0b8fc9df1efbad8ed0c4b84154&q=";
  myrecipe += req.query.q;
  console.log("in getrecipe");
  request(myrecipe).pipe(res);
})

module.exports = router;
