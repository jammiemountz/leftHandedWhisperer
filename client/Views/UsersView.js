app.UsersView = Backbone.View.extend({

  initialize: function(){
    this.render()
  },

  addAll: function(){
    this.collection.forEach(function(item){
      console.log(item.get('name'));
    }, this)
  },


});