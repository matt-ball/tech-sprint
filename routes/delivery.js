var api = require('../lib/on-the-dot');

function delivery(req, res, next) {
  var store = req.params.store;
  var order = req.params.order;

  api.retrieveBooking(store, order, function(data) {
    console.log(data);
    // parse the data
    // render it out
    // res.render..
  });
}

module.exports = delivery;
