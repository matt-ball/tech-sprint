var api = require('../lib/on-the-dot');

// connect to the db
// pull list of store ids and order ids
// hit api for each of the above
// print out

function deliveries (req, res, next) {
  api.retrieveBooking('Qubit-01', '17450362', function(data) {
    console.log(data);
    res.send('loaded');
  });
}

module.exports = deliveries;
