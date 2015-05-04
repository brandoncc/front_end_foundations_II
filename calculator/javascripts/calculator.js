function $(id_selector) {
  return document.getElementById(id_selector);
}

function init() {
  var firstNumber,
      secondNumber,
      operation;
  var result = 0;
  var form = $('form');

  form.onsubmit = function(e) {
    e.preventDefault();
    var resultDisplay = $('result');
    var firstNumberInput = $('firstNumber');
    var secondNumberInput = $('secondNumber');
    var operationInput = $('operation');
    firstNumber = +firstNumberInput.value;
    secondNumber = +secondNumberInput.value;
    operation = operationInput.value;

    if (operation == 'Add') {
      result = add(firstNumber, secondNumber);
    } else if (operation == 'Subtract') {
      result = subtract(firstNumber, secondNumber);
    } else if (operation == 'Multiply') {
      result = multiply(firstNumber, secondNumber);
    } else {
      result = divide(firstNumber, secondNumber);
    }

    resultDisplay.setAttribute('style', 'display: block;');
    resultDisplay.innerText = 'Result: ' + result;

    firstNumberInput.value = '';
    secondNumberInput.value = '';
    operationInput.value = 'Add';
    firstNumberInput.focus();
  };
}

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

window.onload = init;
