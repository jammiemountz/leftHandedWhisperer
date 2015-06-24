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
        var dayModels = that.collection.where({shortDate: date.format()}) 
        var dayview = new app.dayView({data: dayModels});
        // dayModels.forEach(function(model){
        //   var today = new app.dayView({model: model});
        // })
        today.render().appendTo($('body')); 
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