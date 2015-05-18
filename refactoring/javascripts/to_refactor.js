$(function() {
  $("nav a").on("mouseenter", function() {
    $(this).next("ul").show()
  });

  $("nav").on("mouseleave", function() {
    $(this).find("ul ul").hide();
  });

  $(".button, button").on("click", function(e) {
    e.preventDefault();

    $(this).addClass("clicked");
  });

  $(".toggle").on("click", function(e) {
    e.preventDefault();

    $(this).next(".accordion").toggleClass("opened");
  });

  checkCreditCard = function(number, i) {
    if (i % 2 == 1) {
      number = (+number * 2) + "";
      if (number.length > 1) {
        number = +number[0] + +number[1];
      }
      else {
        number = +number;
      }
      this.odd += number;
    }
    else {
      this.even += +number;
    }
  }

  $("form").on("submit", function(e) {
    e.preventDefault();
    var cc_number = $(this).find("[type=text]").val(),
        totals = {
          odd: 0,
          even: 0
        }

    cc_number = cc_number.split("").reverse();
    cc_number.forEach(checkCreditCard, totals);
    if ((totals.odd + totals.even) % 10 == 0) {
      $(this).find(".success").show();
      $(this).find(".error").hide();
    }
    else {
      $(this).find(".error").show();
      $(this).find(".success").hide();
    }
  });


  $("ul a").on("click", function(e) {
    e.preventDefault();

    var month = $(this).text(),
        $stone = $("#birthstone")
        stones = {
          "January": "garnet",
          "February": "amethyst",
          "March": "aquamarine or bloodstone",
          "April": "diamond",
          "May": "emerald",
          "June": "pearl, moonstone, or alexandrite",
          "July": "ruby",
          "August": "peridot",
          "September": "sapphire",
          "October": "opal or tourmaline",
          "November": "topaz or citrine",
          "December": "turqoise, zircon, or tanzanite"
        }

    $stone.text("Your birthstone is " + stones[month]);
  });
});
