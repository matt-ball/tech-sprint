var express = require('express');
var router = express.Router();
var api = require('../lib/on-the-dot');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  api.retrieveBooking('Qubit-01', '17450362', function(data) {
    console.log(data);
  });
});

module.exports = router;
