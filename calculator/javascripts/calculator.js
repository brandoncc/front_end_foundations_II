$(document).ready(function() {
  var firstNumber,
      secondNumber,
      operation;
  var result = 0;

  $('form').submit(function(e) {
    e.preventDefault();

    firstNumber = +$('#firstNumber').val();
    secondNumber = +$('#secondNumber').val();
    operation = $('#operation').val();

    if (operation == 'Add') {
      result = add(firstNumber, secondNumber);
    } else if (operation == 'Subtract') {
      result = subtract(firstNumber, secondNumber);
    } else if (operation == 'Multiply') {
      result = multiply(firstNumber, secondNumber);
    } else {
      result = divide(firstNumber, secondNumber);
    }

    $('#result').show();
    $('#result').text('Result: ' + result);
    $('#secondNumber').val('');
    $('#firstNumber').val('').focus();
  });
});

add = function(n1, n2) {
  return n1 + n2;
}

subtract = function(n1, n2) {
  return n1 - n2;
}

multiply = function(n1, n2) {
  return n1 * n2;
}

divide = function(n1, n2) {
  return n1 / n2;
}
