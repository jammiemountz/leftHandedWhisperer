app.dayView = Backbone.View.extend({

  model: app.Event,

  defaults: {
    // day: 1/1/11
  },

  data: [],

  el: '\
    <h1>' + this.model.get('shortDate') + '</h1>\
  ',

  initialize: function() {
    // this.collection.forEach(function(item) {
    //   if (item.attributes.date === this.day) {
    //     this.data.push(item);
    //   }
    // });
    console.log(this.data)
    this.render();
  },

  events: {
    // 'click ul' : 
  },

  render: function(view) {
    for (var i = 0; i < this.data.length; i++) {
      var newEvent = new eventView({model: this.data[i]});
      this.$el.append(newEvent);
      if (i !== this.data.length - 1) {
        this.$el.append($('<hr>'));
      }
    }

    return this.$el;
  }

});


//When we initialize this, we'll pass a date to it. This is because we don't have a day model,
//and clicking on calendar days will give us that data.
//It looks something like: 
/**
dayClick: function(date, jsEvent, view) {
  var today = new app.dayView({day: date});
  today.render().appendTo($('body'));
}

We need to make sure we're converting all the dates from native Dates to fullcalendar moments
*/