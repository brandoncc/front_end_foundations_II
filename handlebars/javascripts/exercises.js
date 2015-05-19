$(function() {
  var $postsList = $('#posts'),
      postTemplate = Handlebars.compile($('#postTemplate').html()),
      tagTemplate = Handlebars.compile($('#tagTemplate').html()),
      posts = [{
          title: "Awesome post",
          date: "Aug 13, 1972",
          body: "It is crazy how much <strong>awesome</strong> this contains!"
        }, {
          title: "A bit nervous",
          date: "July 1, 1776",
          body: "Things are about to go DOWN!",
          tags: ["revolution", "followtheleaderactuallyonsecondthoughtDONT"]
        }]

  Handlebars.registerPartial('tag', $('#tagTemplate').html());
  $postsList.html(postTemplate({ posts: posts }));
});
