$(document).ready(function() {
  var answer = Math.floor(Math.random() * 101);
  var number_of_guesses = 0;

  $('form').submit(function(event) {
    event.preventDefault();

    var guess = +$('#guess').val();
    var message = "";
    number_of_guesses += 1;

    if (guess > answer) {
      message = "Oops, too high!";
    } else if (guess < answer) {
      message = "Looks like that was too low...";
    } else {
      message = "You got it! That took you " + number_of_guesses + " guesses.";
    }

    $('p').text(message);
  });

  $('a').click(function() {
    answer = Math.floor(Math.random() * 101);
    number_of_guesses = 0;
    $('p').text("Guess a number from 1 to 100");
    $('#guess').val('').focus();
  });
});
