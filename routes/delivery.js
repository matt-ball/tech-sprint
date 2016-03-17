var api = require('../lib/on-the-dot');

function delivery(req, res, next) {
  var store = req.params.store;
  var order = req.params.order;
  
  api.retrieveBooking(store, order, function(data) {
    
    var dataObj = JSON.parse(data).data;
    function setCurrentStatusClass(orderStatus){
      var statusList = [
            {status:'Booked', class:''},
            {status:'Allocated to Driver', class:''},
            {status:'Driver at the Store', class:''},
            {status:'Parcels Collected', class:''},
            {status:'Driver at the Delivery', class:''},
            {status:'Delivered', class:''}
          ]
      var block = false;
      for(var i = 0; i<statusList.length; i++){
        if(orderStatus === statusList[i].status){
          statusList[i].class ='current';
//          if(i>0){
//            statusList[i].class+=' active';
//          }
          block = true;
        }
        else if(!block)
            statusList[i].class = 'completed'
            }      
      return statusList;
    }
    function formatDate(startDate, endDate){
      var start = new Date(startDate);
      var end = new Date(endDate);
//      function getFormattedDate(day){
    var weekDays = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    var dayOfWeek = weekDays[start.getDay()]
    var dayDate = start.getDate()
    var dayMonth = months[start.getMonth()];
    var suffix = 'th'

    if(dayDate % 10 === 1 && dayDate !== 11){
      suffix = 'st'
    }
    else if(dayDate % 10 === 2 && dayDate !== 12){
      suffix = 'nd'
    }
    else if(dayDate % 10 === 3 && dayDate !== 13){
      suffix = 'rd'
    }
    return dayOfWeek + ' '+ dayDate + suffix + ' ' + dayMonth+' | '+start.getHours()+':00 to '+end.getHours()+':00'; 
//  }
      
    }
    function formatData(data){
      return {
        page: dataObj.store.retailerName +' Delivery',
        status: dataObj.status,
        deliveryDateStart: dataObj.timeslot.startTime,
        deliveryDateEnd: dataObj.timeslot.endTime,
        orderId: dataObj.item.referenceNumber,
        storeImage: dataObj.store.imageUrl,
        className: 'delivery',
        statusList: setCurrentStatusClass(dataObj.status),
        deliveryDetails: formatDate(dataObj.timeslot.startTime, dataObj.timeslot.endTime)
      }
    }
    var formatedObj = formatData(data);
    console.log('---------------------'+formatedObj.deliveryDetails);
    
    
    res.render('delivery', formatedObj);

//    res.render('DONE1');
//    console.log(data[status]);
    
    // parse the data
    // render it out
    // res.render..
  });
}

module.exports = delivery;
