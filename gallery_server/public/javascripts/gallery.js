$(function() {
  var slideshow = {
    $el: $("#slideshow"),
    templates: {
      imageTemplate: null,
      imagesTemplate: null,
      imageDetailsTemplate: null,
      commentTemplate: null
    },
    prevSlide: function(e) {
      e.preventDefault();

      var $current = this.activePhoto(),
          $prev = $current.prev("figure"),
          prevId = $prev.data('id'),
          context = this;

      if (!$prev.length) {
        $prev = this.$el.find("figure").last();
        prevId = $prev.data('id');
      }
      $current.fadeOut(this.duration);
      $prev.fadeIn(this.duration);
      context.updateDisplay(prevId);
    },
    nextSlide: function(e) {
      e.preventDefault();

      var $current = this.activePhoto(),
          $next = $current.next("figure"),
          nextId = $next.data('id'),
          context = this;

      if (!$next.length) {
        $next = this.$el.find("figure").first();
        nextId = $next.data('id');
      }
      $current.fadeOut(this.duration);
      $next.fadeIn(this.duration);
      context.updateDisplay(nextId);
    },
    updateDisplay: function(id) {
      var $visibleImage = this.activePhoto(),
          image = this.photos.filter(function(photo) {
            return photo.id === id;
          })[0];

      this.displayComments(id);
      this.displayPhotoDetails(image);
    },
    displayPhotoDetails: function(image) {
      $('#image-details').html(this.templates.imageDetailsTemplate(image));
    },
    displayInitialPage: function() {
      $('#images').html(this.templates.imagesTemplate({images: this.photos}));
      this.updateDisplay(this.activePhotoId());
    },
    getPhotos: function() {
      $.ajax('/photos/', {
        context: this,
        dataType: 'json',
        success: function(data) {
          this.photos = data;
          this.displayInitialPage();
        },
        error: function(xhr, text, error) {
          alert('There was a problem downloading the photo collection.');
        }
      });
    },
    displayComments: function(id) {
      $.ajax('/comments', {
        context: this,
        data: {
          'photo_id': id
        },
        success: function(data) {
          this.comments = data;
          $('#comments').html(this.templates.commentsTemplate({comments: this.comments}));
        },
        error: function(xhr, text, error) {
          alert('There was a problem downloading the comments.');
        }
      });
    },
    likePhoto: function(e) {
      e.preventDefault();

      $.ajax('/photos/like', {
        context: this,
        data: {
          'photo_id': this.activePhotoId()
        },
        method: 'post',
        success: function() {
          var photo = this.activePhotoObject();

          photo.likes++;
          this.displayPhotoDetails(photo);
        },
        error: function() {
          alert('There was a problem saving your like. Please try again.');
        }
      });
    },
    favoritePhoto: function(e) {
      e.preventDefault();

      $.ajax('/photos/favorite', {
        context: this,
        data: {
          'photo_id': this.activePhotoId()
        },
        method: 'post',
        success: function() {
          var photo = this.activePhotoObject();

          photo.favorites++;
          this.displayPhotoDetails(photo);
        },
        error: function() {
          alert('There was a problem favoriting the photo. Please try again.');
        }
      });
    },
    submitComment: function(e) {
      e.preventDefault();

      var formData = $(e.target).serializeArray();
      formData.push({name: 'photo_id', value: this.activePhotoId()});

      $.ajax('/comments/new', {
        context: this,
        data: $.param(formData),
        method: 'post',
        success: function() {
          this.displayComments(this.activePhotoId());
          $('form#new-comment').get(0).reset();
        },
        error: function() {
          alert('There was a problem saving your comment. Please try again.');
        }
      });
    },
    activePhoto: function() {
      return this.$el.find("figure:visible");
    },
    activePhotoId: function() {
      return this.activePhoto().data('id');
    },
    activePhotoObject: function() {
      var activeId = this.activePhotoId();

      return this.photos.filter(function(photo) {
        return photo.id === activeId;
      })[0];
    },
    bind: function() {
      this.$el.on("click", "a.prev", $.proxy(this.prevSlide, this));
      this.$el.on("click", "a.next", $.proxy(this.nextSlide, this));
      $('#image-details').on('click', '#favorite', $.proxy(this.favoritePhoto, this));
      $('#image-details').on('click', '#like', $.proxy(this.likePhoto, this));
      $('#new-comment').on('submit', $.proxy(this.submitComment, this));
    },
    compileTemplates: function() {
      var imagesTemplate = $('#images-template').html(),
          imageTemplate = $('#image-template').html(),
          detailsTemplate = $('#image-details-template').html(),
          commentsTemplate = $('#comments-template').html(),
          commentTemplate = $('#comment-template').html();

      this.templates.imageTemplate = Handlebars.compile(imageTemplate),
      this.templates.imagesTemplate = Handlebars.compile(imagesTemplate),
      this.templates.imageDetailsTemplate = Handlebars.compile(detailsTemplate);
      this.templates.commentsTemplate = Handlebars.compile(commentsTemplate);
      this.templates.commentTemplate = Handlebars.compile(commentTemplate);

      Handlebars.registerPartial('imageTemplate', imageTemplate);
      Handlebars.registerPartial('commentTemplate', commentTemplate);
    },
    init: function() {
      this.bind();
      this.compileTemplates();
      this.getPhotos();
    }
  };

  slideshow.init();
});
