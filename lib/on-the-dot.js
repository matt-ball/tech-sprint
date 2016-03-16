var request = require('request');

var baseUrl = 'http://sbapi.onthedot.com/api/v1.0/';

var headers = {
  'Authorization': 'Bearer KnzSDzM7fDElTH4LzVomDP15s64a',
  'Content-Type': 'application/json',
  'Channel': 'ECOM'
};

var req = function(uri, cb) {
  request({
    'uri': uri.join('/'),
    'baseUrl': baseUrl,
    'method': 'GET',
    'headers': headers
  }, function(error, response, body) {
    if (response && response.statusCode === 200 && body) {
      cb(body);
    }
  });
};

var onTheDot = {
  retrieveBooking: function(storeId, orderNo, cb) {
    req([
      'bookings',
      'orderid',
      storeId,
      orderNo
    ], cb);
  },
  trackBooking: function(storeId, orderNo, cb) {
    req([
      'track',
      'store',
      storeId,
      'job',
      orderNo
    ], cb);
  }
};

module.exports = onTheDot;
