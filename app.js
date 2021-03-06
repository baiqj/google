var express = require('express');
var google = express();
var favicon = require('serve-favicon');
var request = require('request');
var fs = require('fs');

var KEY = 'AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY';
var CX = '010939073182372963055:k8pff1pzvy8';
var REQ_URL = 'https://www.googleapis.com/customsearch/v1element?' +
                'prettyPrint=false' +
                '&key=' + KEY +
                '&cx=' + CX;

google.set('view engine', 'ejs');
google.set('views', __dirname + '/views');

google.use(favicon(__dirname + '/public/img/favicon.ico'));
google.use(express.static(__dirname + '/public/'));

google.get('/search', function(req, res, next) {
  var url;
  if (req.query.q) {
    url = REQ_URL;
    
    for (var i in req.query) {
      url = url + '&' + i + '=' + req.query[i];
    }
    
    request(url, function (err, response, body) {
      var para;

      if (!err && response.statusCode == 200) {
        para = JSON.parse(body);
        if (para.error) {
          res.render('index');
        } else {
          para.q = req.query.q;
          res.render('search', para);
        }
        
      } else {
        res.render('index');
      }
    });

  } else {
    res.render('index');
  }
});

google.get(/^\/(index.html)?/, function(req, res) {
  res.render('index');
});

google.listen(80);
