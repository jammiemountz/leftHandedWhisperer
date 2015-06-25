app.navbarView = Backbone.View.extend({
  // className : 'loginout',
  el: document.getElementsByClassName('navbar'),

  initialize : function() {
    app.loginout = new app.logInOutView({});
  },

  events : {
    'click li #calendarButton': 'renderCalendarView',
    'click li #newEventButton': 'renderNewEventView',

  },

  render : function() {
  },

  renderCalendarView: function(){
    // app.router.navigate('/calendar', { trigger: true });
    app.mainpage.render('calendar');
  },

  renderNewEventView: function(){
    // app.router.navigate('/calendar', { trigger: true });
    app.sidepage.render('newEvent');
  },
});