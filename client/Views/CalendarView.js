app.calendarView = Backbone.View.extend({
  el : '<div id="calendar"></div>',

  initialize: function(){
    this.collection.on('sync change', this.addAll, this);
    this.collection.fetch();
  },

  render: function() {
    return this.$el;
  },

  addAll: function(){
    var that = this;
    this.$el.fullCalendar({
      dayClick: function(date) {
        $('.dayEventView').empty();
        var dayModel = that.collection.where({shortDate: date.format()}) 
        for (var i=0; i<dayModel.length; i++) {
          var dayview = new app.dayView({model: dayModel[i]});
          dayview.render().appendTo($('.dayEventView')); 
        }
      }
    });
    this.collection.forEach(function(item){
      this.$el.fullCalendar('renderEvent', {
        title: item.get('name'),
        start: item.get('date')
      }, true); 
    }, this)
  },

  addOne: function(event){
    var view = new app.EventView({model: event});
    this.$el.append(view.render().el);
  },

  renderDay: function(date){
    console.log('render day view')
    console.log(date)
  }

})