var request = require('request');

var baseUrl = 'http://sbapi.onthedot.com/api/v1.0/';
var key = 'KnzSDzM7fDElTH4LzVomDP15s64a';
var channel = 'ECOM';

var onTheDot = {
  retrieveBooking: function(storeId, orderNo, cb) {
    request({
      'uri': 'bookings/orderid/' + storeId + '/' + orderNo,
      'baseUrl': baseUrl,
      'method': 'GET',
      'headers': {
        'Authorization': 'Bearer ' + key,
        'Content-Type': 'application/json',
        'Channel': channel
      }
    }, function(error, response, body) {
      if (response && response.statusCode === 200 && body) {
        cb(body);
      }
    });
  }
};

module.exports = onTheDot;