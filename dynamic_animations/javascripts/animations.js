$(function() {
  var $canvas = $('#canvas'),
      canvasWidth = $('#canvas').width(),
      canvasHeight = $('#canvas').height(),
      shapeWidth = 30,
      shapeHeight = 30,
      maxShapeX = canvasWidth - shapeWidth,
      maxShapeY = canvasHeight - shapeHeight,
      animationDuration = 1000;

  $('form').submit(function(e) {
    e.preventDefault();

    var chosenShape = $('input[name="shape"]:checked').val(),
        startingX = $('#starting-x').val(),
        startingY = $('#starting-y').val();
        endingX = $('#ending-x').val(),
        endingY = $('#ending-y').val();

    if (!chosenShape) {
      alert("You must choose a shape to add.");
      return;
    }

    if(!startingX || !startingY) {
      alert("You must enter your starting coordinates");
      return;
    }

    if(!endingX || !endingY) {
      alert("You must enter your ending coordinates");
      return;
    }

    if (startingX < 0 || startingX > maxShapeX) {
      alert("Starting x must be between 0 and " + (maxShapeX));
      return;
    }

    if (startingY < 0 || startingY > maxShapeY) {
      alert("Starting y must be between 0 and " + (maxShapeY));
      return;
    }

    if (endingX < 0 || endingX > maxShapeX) {
      alert("Ending x must be between 0 and " + (maxShapeX));
      return;
    }

    if (endingY < 0 || endingY > maxShapeY) {
      alert("Ending y must be between 0 and " + (maxShapeY));
      return;
    }

    addShape($canvas, chosenShape, animationDuration, startingX, startingY, endingX, endingY);
  });

  $('input[value="Add random shape"]').click(function() {
    var shapes = ['circle', 'square', 'star'],
        chosenShape = shapes[chooseRandomBetween(0, shapes.length - 1)],
        animationDuration = chooseRandomBetween(500, 5000),
        startingX = chooseRandomBetween(0, maxShapeX),
        startingY = chooseRandomBetween(0, maxShapeY),
        endingX = chooseRandomBetween(0, maxShapeX),
        endingY = chooseRandomBetween(0, maxShapeY);

    addShape($canvas, chosenShape, animationDuration, startingX, startingY, endingX, endingY);
  });

  $('#start-animation').click(function(e) {
    e.preventDefault();

    stopAnimation();
    resetShapes();
    startAnimation();
  });

  $('#stop-animation').click(function(e) {
    e.preventDefault();

    stopAnimation();
  });
});

addShape = function(c, s, d, sX, sY, eX, eY) {
  var $shape = $('<div class="shape ' + s + '">');

  $shape.data({
    startX: sX,
    startY: sY,
    endX: eX,
    endY: eY,
    animationDuration: d
  });

  resetShape($shape);
  c.append($shape);
}

resetShapes = function() {
  $('.shape').each(function() { resetShape($(this)) });
}

resetShape = function($shape) {
  $shape.css({
    top: +$shape.data().startY,
    left: +$shape.data().startX
  });
}

stopAnimation = function() {
  $('.shape').stop();
}

startAnimation = function() {
  $('.shape').each(animateElement);
}

animateElement = function() {
  $shape = $(this);

  $shape.animate({
    top: +$shape.data().endY,
    left: +$shape.data().endX
  }, $shape.data().animationDuration);
}

chooseRandomBetween = function(min, max) {
  var difference = Math.abs(max - min) + 1;

  return Math.floor(Math.random() * difference) + Math.min(min, max);
}
