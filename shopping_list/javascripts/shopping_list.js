$(document).ready(function() {
  $('form').submit(function(e) {
    e.preventDefault();

    var quantity = +$('#quantity').val() || 1;
    var name = $('#name').val();

    if ($('ul li').first().text() == 'No items added yet!') {
      $('ul li').first().remove();
    }

    $('ul').append('<li>' + quantity + ' ' + name + '</li>');
    $('form')[0].reset();
  });
});
