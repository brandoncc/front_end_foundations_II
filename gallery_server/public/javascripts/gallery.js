$(function() {
  var templates = {},
      photos;

  $('script[type="text/x-handlebars"]').each(function() {
    var $template = $(this);
    templates[camelize($template.attr('id'))] = Handlebars.compile($(this).html());
  });

  $('[data-type="partial"]').each(function() {
    var $partial = $(this);
    Handlebars.registerPartial(camelize($partial.attr('id')), $(this).html());
  });

  function camelize(s) {
    return s.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  }

  var slideshow = {
    $el: $("#slideshow"),
    duration: 400,
    prevSlide: function(e) {
      e.preventDefault();

      var $current = this.activePhoto(),
          $prev = $current.prev("figure"),
          context = this;

      if (!$prev.length) {
        $prev = this.$el.find("figure").last();
      }

      var prevId = $prev.data('id');

      $current.fadeOut(this.duration);
      $prev.fadeIn(this.duration);
      displayPhotoInformation(prevId);
    },
    nextSlide: function(e) {
      e.preventDefault();

      var $current = this.activePhoto(),
          $next = $current.next("figure"),
          context = this;

      if (!$next.length) {
        $next = this.$el.find("figure").first();
      }

      var nextId = $next.data('id');

      $current.fadeOut(this.duration);
      $next.fadeIn(this.duration);
      displayPhotoInformation(nextId);
    },
    activePhoto: function() {
      return this.$el.find("figure:visible");
    },
    activePhotoId: function() {
      return this.activePhoto().data('id');
    },
    activePhotoObject: function() {
      var activeId = this.activePhotoId();

      return photos.filter(function(photo) {
        return photo.id === activeId;
      })[0];
    },
    bind: function() {
      this.$el.on("click", "a.prev", $.proxy(this.prevSlide, this));
      this.$el.on("click", "a.next", $.proxy(this.nextSlide, this));
    },
    init: function() {
      this.bind();
      getPhotos();
    }
  };

  function displayCommentsFor(id) {
    $.ajax('/comments', {
      data: {
        'photo_id': id
      },
      success: function(data) {
        var comments = data;
        $('#comments').html(templates.commentsTemplate({comments: comments}));
      },
      error: function(xhr, text, error) {
        alert('There was a problem downloading the comments.');
      }
    });
  };

  function submitComment(e) {
    e.preventDefault();

    var formData = $(e.target).serializeArray();
    formData.push({name: 'photo_id', value: slideshow.activePhotoId()});

    $.ajax('/comments/new', {
      data: $.param(formData),
      method: 'post',
      success: function() {
        displayCommentsFor(slideshow.activePhotoId());
        $('form#new-comment').get(0).reset();
      },
      error: function() {
        alert('There was a problem saving your comment. Please try again.');
      }
    });
  };

  function displayPhotoInformation(id) {
    var $visibleImage = slideshow.activePhoto(),
        image = photos.filter(function(photo) {
          return photo.id === id;
        })[0];

    displayCommentsFor(id);
    displayPhotoDetails(image);
  };

  function displayPhotoDetails(image) {
    $('#image-details').html(templates.imageDetailsTemplate(image));
  };

  function renderPhotos() {
    $('#images').html(templates.imagesTemplate({images: photos}));
  };

  function getPhotos() {
    $.ajax('/photos', {
      dataType: 'json',
      success: function(data) {
        photos = data;
        renderPhotos();
        displayPhotoInformation(photos[0].id);
      },
      error: function(xhr, text, error) {
        alert('There was a problem downloading the photo collection.');
      }
    });
  };

  $('#image-details').on('click', '#social-buttons a', function(e) {
    e.preventDefault();

    $.ajax({
      url: $(e.target).attr('href'),
      data: {
        'photo_id': slideshow.activePhotoId()
      },
      method: 'post',
      success: function(data) {
        var photo = slideshow.activePhotoObject();

        if (this.url.match(/like$/)) {
          photo.likes++;
        } else {
          photo.favorites++;
        }

        displayPhotoDetails(photo);
      },
      error: function() {
        alert('There was a problem saving your like. Please try again.');
      }
    });
  });

  $('#new-comment').on('submit', submitComment);

  slideshow.init();
});
