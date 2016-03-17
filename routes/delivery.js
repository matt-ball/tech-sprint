var api = require('../lib/on-the-dot');

function delivery(req, res, next) {
  var store = req.params.store;
  var order = req.params.order;
  
  api.retrieveBooking(store, order, function(data) {
    
    var dataObj = JSON.parse(data).data;
    function formatData(data){
      return {
        page: dataObj.store.retailerName +' Delivery',
        status: dataObj.status,
        deliveryDateStart: dataObj.timeslot.startTime,
        deliveryDateEnd: dataObj.timeslot.endTime,
        orderId: dataObj.item.referenceNumber 
      }
    }
    var formatedObj = formatData(data);
    console.log('DATA---------------------'+formatedObj.status, formatedObj.deliveryDateStart, formatedObj.deliveryDateEnd, formatedObj.orderId);
    
    
    res.render('delivery', formatedObj);

//    res.render('DONE1');
//    console.log(data[status]);
    
    // parse the data
    // render it out
    // res.render..
  });
}

module.exports = delivery;
