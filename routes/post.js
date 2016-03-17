var mysql = require('mysql');

function post (req, res, next) {
  var email = req.body.email;
  var store_id = req.body.store_id;
  var order_number = req.body.order_number;
  
  if (!req.body.email || !req.body.store_id || !req.body.order_number) {
    res.json({status: 400});
  }

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'password',
    database : 'tech_sprint'
  });

  connection.connect();

  connection.query('INSERT INTO bookings VALUES("' + order_number + '", "' + store_id + '", "' + email +'")', function(err, rows, fields) {
    if (err) throw err;
    res.json({status: 200});
  });

  connection.end();

}

module.exports = post;
