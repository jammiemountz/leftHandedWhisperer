app.dayView = Backbone.View.extend({

  model: app.Event,

  template: _.template('\
    <ul class="list-group">\
      <li class="list-group-item">Name: <%= name %></li>\
      <li class="list-group-item">Address: <%= address %><p></p><%= city %>, <%= state %>, <%= zip %></li>\
      <li class="list-group-item">Date: <%= date %></li>\
      <li class="list-group-item">Venue: <%= venue %></li>\
      <li class="list-group-item">Description: <%= description %></li>\
    </ul>\
  '),

  initialize: function() {
    this.render();
  },

  events: {
    // 'click ul' : 
  },

  render: function(view) {
    console.log('data', this.data)
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});