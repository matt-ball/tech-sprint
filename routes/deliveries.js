var api = require('../lib/on-the-dot');
var mysql = require('mysql');
// connect to the db
// pull list of store ids and order ids
// hit api for each of the above
// print out

function getOrders(i, result, rows, cb) {
  api.retrieveBooking(rows[i].store_id, rows[i].order_number, function(data) {
    data = JSON.parse(data);
    console.log(data.data);
    result.push({
      store: data.data.store.storeId,
      img: data.data.store.imageUrl,
      status: data.data.status,
      time: new Date(data.data.timeslot.startTime).toUTCString(),
      order: data.data.orderNo
    });
    i++;
    if (i !== rows.length) getOrders(i, result, rows, cb);
    else cb(result);
  });
}

function deliveries (req, res, next) {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'password',
    database : 'tech_sprint'
  });

  connection.connect();

  connection.query('SELECT store_id, order_number FROM bookings WHERE email = "noel_gallagher@qubit.com"', function(err, rows, fields) {
    if (err) throw err;
    getOrders(0, [], rows, function(result) {
      res.render('deliveries', { page: 'My Deliveries', className: 'deliveries', results: result });
    });
  });

  connection.end();
}

module.exports = deliveries;