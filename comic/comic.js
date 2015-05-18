$(document).ready(function() {
  var $blinds = $('div[id^=blind]');
  var speed = 250;
  var delay = 1500;

  $blinds.each(function(i) {
    var $blind = $($blinds).eq(i);
    $blind.delay(delay * i + speed).animate({height: 0, top: '+=' + $blind.height()}, speed);
  });
});
