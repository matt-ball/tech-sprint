$(function() {
  var $tabs = $('.tab-retailer, .tab-date');
  
  $tabs.click(function() {
    var $this = $(this);
    if (!$this.hasClass('active')) {
      $tabs.removeClass('active');
      $this.addClass('active');
    }
  });
});
