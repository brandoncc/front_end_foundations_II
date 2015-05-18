$(function() {
  var inventory = {
    currentId: 0,
    itemTemplate: '',
    requester: '',
    shippingAddress: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: ''
    },
    setDate: function() {
      $('#order-date').text((new Date()).toUTCString());
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    },
    cacheTemplate: function() {
      this.itemTemplate = $('script[type="text/template"]').get(0).innerHTML;
      $('script[type="text/template"]').remove();
    },
    bindEvents: function() {
      $('#add-item').on('click', $.proxy(this.addItem, this));
      $('#items').on('click', 'a.remove', $.proxy(this.removeItem, this));
      $('#items').on('keyup', 'input[type="text"]', $.proxy(this.updateItem, this));
      $('#requester-name').on('keyup', $.proxy(this.setRequester, this));
      $('#shipping-info').on('keyup', ':input', $.proxy(this.setShippingAddress, this));
    },
    setRequester: function(e) {
      var requester = $(e.target).val();
      this.requester = requester;
    },
    setShippingAddress: function(e) {
      var $addresses = $(e.target).closest('div').find('.shipping-address :input'),
          city = $('#city').val(),
          state = $('#state').val(),
          zipCode = $('#zipcode').val();

      this.shippingAddress.address1 = $addresses.first().val();
      this.shippingAddress.address2 = $addresses.last().val();
      this.shippingAddress.city = city;
      this.shippingAddress.state = state;
      this.shippingAddress.zipCode = zipCode;
    },
    items: [],
    addItem: function() {
      var newItem = inventory.generateNewItem();
      this.items.push(newItem);

      this.displayItem(newItem);
    },
    removeItem: function(e) {
      var $item = this.findParent(e),
          id = +$item.data('id'),
          itemInArray = this.findItem(id),
          newItemsArray = [];

      $item.remove();
      this.items.splice(this.items.indexOf(itemInArray), 1);
    },
    process: function() {
      $('button, a').remove();
      $('input').prop('readonly', true);
      $('main').addClass('processed');
    },
    generateNewItem: function() {
      this.currentId++;

      return {
        id: this.currentId,
        name: '',
        stockNumber: '',
        quantity: 1
      }
    },
    displayItems: function() {
      $('#items li').remove();
      for (item in this.items) {
        this.displayItem(item);
      }
    },
    displayItem: function(item) {
      $('#items').append(this.itemTemplate.replace(/ID/g, item.id).replace(/NAME/, item.name).replace(/STOCK/, item.stockNumber).replace(/QUANTITY/, item.quantity));
    },
    updateItem: function(e) {
      var $item = this.findParent(e),
          id = +$item.data('id'),
          itemInArray = this.findItem(id);

      itemInArray.name = $item.find('.name').val();
      itemInArray.stockNumber = $item.find('.stock-number').val();
      itemInArray.quantity = +$item.find('.quantity').val();
    },
    findParent: function(e) {
      return $(e.target).closest('li');
    },
    findItem: function(id) {
      for(var i = 0, length = this.items.length; i < length; i++) {
        if (this.items[i].id === id) {
          return this.items[i];
        }
      }

      return null;
    }
  }

  $('form').submit(function(e) {
    e.preventDefault();
    inventory.process();
  });

  inventory.init();

  window.inventory = inventory;
});
